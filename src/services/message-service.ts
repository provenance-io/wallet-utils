import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { Message } from 'google-protobuf';
import type { Msg, Wallet } from '@tendermint/sig';
import type { Bytes } from '@tendermint/types';
import { base64ToBytes, bufferToBytes, bytesToBase64 } from '@tendermint/belt';
import { MsgExecuteContract } from '../proto/cosmwasm/wasm/v1/tx_pb';
import { createHash } from 'crypto';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';
import {
  MESSAGE_PROTOS,
  CoinAsObject,
  MsgBeginRedelegateDisplay,
  MsgCreateValidatorDisplay,
  MsgCreateVestingAccountDisplay,
  MsgDelegateDisplay,
  MsgDepositDisplay,
  MsgEditValidatorDisplay,
  MsgExecuteContractParams,
  MsgFundCommunityPoolDisplay,
  MsgGrantDisplay,
  MsgRevokeDisplay,
  MsgSendDisplay,
  MsgSetWithdrawAddressDisplay,
  MsgSubmitEvidenceDisplay,
  MsgCreateGroupDisplay,
  MsgUpdateGroupMembersDisplay,
  MsgUpdateGroupAdminDisplay,
  MsgUpdateGroupMetadataDisplay,
  MsgCreateGroupPolicyDisplay,
  MsgUpdateGroupPolicyAdminDisplay,
  MsgCreateGroupWithPolicyDisplay,
  MsgUpdateGroupPolicyDecisionPolicyDisplay,
  MsgUpdateGroupPolicyMetadataDisplay,
  MsgSubmitGroupProposalDisplay,
  MsgWithdrawProposalDisplay,
  MsgGroupVoteDisplay,
  MsgExecDisplay,
  MsgLeaveGroupDisplay,
  MsgSubmitProposalDisplay,
  MsgUndelegateDisplay,
  MsgUnjailDisplay,
  MsgVerifyInvariantDisplay,
  MsgVoteDisplay,
  MsgVoteWeightedDisplay,
  MsgWithdrawDelegatorRewardDisplay,
  MsgWithdrawValidatorCommissionDisplay,
  ReadableMessageNames,
  TYPE_NAMES_READABLE_MAP,
  SupportedMessageTypeNames,
} from '../types';
import { BaseAccount } from '../proto/cosmos/auth/v1beta1/auth_pb';
import { Coin } from '../proto/cosmos/base/v1beta1/coin_pb';
import { MsgSend } from '../proto/cosmos/bank/v1beta1/tx_pb';
import { MsgDelegate } from '../proto/cosmos/staking/v1beta1/tx_pb';
import { PubKey } from '../proto/cosmos/crypto/secp256k1/keys_pb';
import {
  AuthInfo,
  Fee,
  ModeInfo,
  SignDoc,
  SignerInfo,
  TxBody,
  TxRaw,
} from '../proto/cosmos/tx/v1beta1/tx_pb';
import { CalculateTxFeesRequest } from '../proto/provenance/msgfees/v1/query_pb';
import { SignMode } from '../proto/cosmos/tx/signing/v1beta1/signing_pb';
import {
  BroadcastMode,
  BroadcastTxRequest,
} from '../proto/cosmos/tx/v1beta1/service_pb';
import { MsgAddMarkerRequest } from '../proto/provenance/marker/v1/tx_pb';
import { MarkerStatus, MarkerType } from '../proto/provenance/marker/v1/marker_pb';
import { Access } from '../proto/provenance/marker/v1/accessgrant_pb';
import { formatCustomObj, formatSingleValue } from '../utils';
import { isMatching, P } from 'ts-pattern';
import { MsgCreateGroup } from '../proto/cosmos/group/v1/tx_pb';
import { MemberRequest } from '../proto/cosmos/group/v1/types_pb';
import {
  MsgExecLegacyContent,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from '../proto/cosmos/gov/v1/tx_pb';
import { TextProposal } from '../proto/cosmos/gov/v1beta1/gov_pb';
import {
  CancelSoftwareUpgradeProposal,
  SoftwareUpgradeProposal,
} from '../proto/cosmos/upgrade/v1beta1/upgrade_pb';
import {
  StoreCodeProposal,
  InstantiateContractProposal,
} from '../proto/cosmwasm/wasm/v1/proposal_pb';
import { AccessType } from '../proto/cosmwasm/wasm/v1/types_pb';
import { ParameterChangeProposal } from '../proto/cosmos/params/v1beta1/params_pb';
import { VoteOption } from '../proto/cosmos/gov/v1/gov_pb';

export type GenericDisplay = { [key: string]: any };

export type MsgExecuteContractDisplay = {
  sender: string;
  msg: any;
  fundsList: CoinAsObject[];
};

export type FallbackGenericMessageName = 'MsgGeneric' | 'MsgExecuteContractGeneric';

interface BuildAuthInfo {
  signerInfo: SignerInfo;
  feeDenom: string;
  feeEstimate?: CoinAsObject[];
  gasLimit: number;
  feePayer?: string;
  feeGranter?: string;
}

export const buildAuthInfo = ({
  signerInfo,
  feeDenom,
  feeEstimate = [],
  gasLimit,
  feePayer,
  feeGranter,
}: BuildAuthInfo): AuthInfo => {
  //
  // TODO: Move feeList into it's own function and add unit tests
  //

  //
  // This is to support a list of fees of any denom
  // calculateTxFees should give a totalFeesList back
  // that list is used here, only after you have added the gasFee to it
  // which should be the estimatedGas amount received from calculateTxFees
  // and multiplied by the desired gasPrice
  const feeList = feeEstimate
    .reduce((agg: CoinAsObject[], curr: CoinAsObject) => {
      // Find if the same coin is already in the aggregated list
      const sameCoin = agg.find((i) => i.denom === curr.denom);
      if (sameCoin) {
        // if it is find the index of it
        const sameCoinInd = agg.findIndex((i) => i.denom === sameCoin.denom);
        // create a new array from the aggregate so we don't mutate it
        const result = [...agg];
        // change the item in place to add the current amount to whatever it currently is
        result[sameCoinInd] = {
          amount: +sameCoin.amount + +curr.amount,
          denom: curr.denom,
        };
        // return the resulting array
        return result;
      }

      // if the coin wasn't already in the aggregate just add it to the aggregate here
      return [...agg, curr];
    }, [])
    // sort by denom name in ascending order (assumes all denoms are lowercase)
    .sort((a, b) => (a.denom > b.denom ? 1 : -1))
    .map((feeItem) => {
      // map each feeItem and create a coin out of it
      const feeCoin = new Coin();
      feeCoin.setDenom(feeItem.denom);
      // since the amount can be a string or number we convert it to a string here
      feeCoin.setAmount(feeItem.amount.toString());
      return feeCoin;
    });

  const fee = new Fee();
  fee.setAmountList(feeList);
  fee.setGasLimit(gasLimit);
  if (feePayer) fee.setPayer(feePayer);
  if (feeGranter) fee.setGranter(feeGranter);
  const authInfo = new AuthInfo();
  authInfo.setFee(fee);
  authInfo.setSignerInfosList([signerInfo].filter((f) => f));
  return authInfo;
};

export const buildSignerInfo = (
  baseAccount: BaseAccount,
  pubKeyBytes: Bytes
): SignerInfo => {
  const single = new ModeInfo.Single();
  single.setMode(SignMode.SIGN_MODE_DIRECT);
  const modeInfo = new ModeInfo();
  modeInfo.setSingle(single);
  const signerInfo = new SignerInfo();
  const pubKey = new PubKey();
  pubKey.setKey(pubKeyBytes);
  const pubKeyAny = new google_protobuf_any_pb.Any();
  pubKeyAny.pack(pubKey.serializeBinary(), TYPE_NAMES_READABLE_MAP.PubKey, '/');
  signerInfo.setPublicKey(pubKeyAny);
  signerInfo.setModeInfo(modeInfo);
  signerInfo.setSequence(baseAccount.getSequence());
  return signerInfo;
};

interface BuildTxBodyProps {
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[];
  extensionOptionsList?: google_protobuf_any_pb.Any[];
  nonCriticalExtensionOptionsList?: google_protobuf_any_pb.Any[];
  memo?: string;
  timeoutHeight?: number;
}
export const buildTxBody = ({
  msgAny,
  memo = '',
  timeoutHeight,
  extensionOptionsList,
  nonCriticalExtensionOptionsList,
}: BuildTxBodyProps): TxBody => {
  const txBody = new TxBody();
  if (Array.isArray(msgAny)) txBody.setMessagesList(msgAny);
  else txBody.addMessages(msgAny);
  txBody.setMemo(memo);
  if (timeoutHeight) txBody.setTimeoutHeight(timeoutHeight);
  if (extensionOptionsList) txBody.setExtensionOptionsList(extensionOptionsList);
  if (nonCriticalExtensionOptionsList)
    txBody.setNonCriticalExtensionOptionsList(nonCriticalExtensionOptionsList);
  return txBody;
};

export const buildSignDoc = (
  accNumber: number,
  chainId: string,
  txRaw: TxRaw
): SignDoc => {
  const signDoc = new SignDoc();
  signDoc.setAccountNumber(accNumber);
  signDoc.setAuthInfoBytes(txRaw.getAuthInfoBytes());
  signDoc.setChainId(chainId);
  signDoc.setBodyBytes(txRaw.getBodyBytes());
  return signDoc;
};

export const sha256 = (bytes: Bytes): Bytes => {
  const buffer1 = bytes instanceof Buffer ? bytes : Buffer.from(bytes);
  const buffer2 = createHash('sha256').update(buffer1).digest();

  return bufferToBytes(buffer2);
};

export const signBytes = (bytes: Uint8Array, privateKey: Bytes): Uint8Array => {
  const hash = sha256(bytes);
  const { signature } = secp256k1EcdsaSign(hash, privateKey);

  return signature;
};

type CalculateTxFeesRequestParams = BuildTxBodyProps & {
  account: BaseAccount;
  publicKey: Bytes;
  gasPriceDenom?: string;
  gasLimit: number;
  gasAdjustment?: number;
  feeGranter?: string;
  feePayer?: string;
};

export const buildCalculateTxFeeRequest = ({
  msgAny,
  account,
  publicKey,
  gasPriceDenom = 'nhash',
  gasLimit,
  gasAdjustment = 1.25,
  feeGranter,
  feePayer,
  memo,
  timeoutHeight,
  extensionOptionsList,
  nonCriticalExtensionOptionsList,
}: CalculateTxFeesRequestParams): CalculateTxFeesRequest => {
  const signerInfo = buildSignerInfo(account, publicKey);
  const authInfo = buildAuthInfo({
    signerInfo,
    feeDenom: gasPriceDenom,
    gasLimit,
    feeGranter,
    feePayer,
  });
  const txBody = buildTxBody({
    msgAny,
    memo,
    timeoutHeight,
    extensionOptionsList,
    nonCriticalExtensionOptionsList,
  });
  const txRaw = new TxRaw();
  txRaw.setBodyBytes(txBody.serializeBinary());
  txRaw.setAuthInfoBytes(authInfo.serializeBinary());
  txRaw.setSignaturesList(['']);

  const calculateTxFeeRequest = new CalculateTxFeesRequest();
  calculateTxFeeRequest.setTxBytes(txRaw.serializeBinary());
  calculateTxFeeRequest.setDefaultBaseDenom(gasPriceDenom);
  calculateTxFeeRequest.setGasAdjustment(gasAdjustment);
  return calculateTxFeeRequest;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');

export const buildMessage = (
  type: ReadableMessageNames,
  params:
    | MsgSendDisplay
    | MsgExecuteContractParams
    | MsgGrantDisplay
    | MsgRevokeDisplay
    | MsgVerifyInvariantDisplay
    | MsgSetWithdrawAddressDisplay
    | MsgWithdrawDelegatorRewardDisplay
    | MsgWithdrawValidatorCommissionDisplay
    | MsgFundCommunityPoolDisplay
    | MsgSubmitEvidenceDisplay
    | MsgSubmitProposalDisplay
    | MsgVoteDisplay
    | MsgVoteWeightedDisplay
    | MsgDepositDisplay
    | MsgUnjailDisplay
    | MsgCreateValidatorDisplay
    | MsgEditValidatorDisplay
    | MsgDelegateDisplay
    | MsgBeginRedelegateDisplay
    | MsgUndelegateDisplay
    | MsgCreateVestingAccountDisplay
    | MsgCreateGroupDisplay
    | MsgUpdateGroupMembersDisplay
    | MsgUpdateGroupAdminDisplay
    | MsgUpdateGroupMetadataDisplay
    | MsgCreateGroupPolicyDisplay
    | MsgUpdateGroupPolicyAdminDisplay
    | MsgCreateGroupWithPolicyDisplay
    | MsgUpdateGroupPolicyDecisionPolicyDisplay
    | MsgUpdateGroupPolicyMetadataDisplay
    | MsgSubmitGroupProposalDisplay
    | MsgWithdrawProposalDisplay
    | MsgGroupVoteDisplay
    | MsgExecDisplay
    | MsgLeaveGroupDisplay
) => {
  switch (type) {
    case 'MsgDelegate': {
      const { delegatorAddress, validatorAddress, amount } =
        params as MsgDelegateDisplay;
      const msgDelegate = new MsgDelegate()
        .setDelegatorAddress(delegatorAddress)
        .setValidatorAddress(validatorAddress);
      if (amount) {
        msgDelegate.setAmount(
          new Coin().setAmount(`${amount.amount}`).setDenom(amount.denom)
        );
      }
      return msgDelegate;
    }

    case 'MsgSend': {
      const { fromAddress, toAddress, amountList } = params as MsgSendDisplay;
      const msgSend = new MsgSend()
        .setFromAddress(fromAddress)
        .setToAddress(toAddress);
      amountList.forEach(({ denom, amount }) => {
        msgSend.addAmount(new Coin().setAmount(`${amount}`).setDenom(denom));
      });
      return msgSend;
    }

    case 'MsgCreateGroup': {
      const { admin, membersList, metadata } = params as MsgCreateGroupDisplay;
      const msgCreateGroup = new MsgCreateGroup()
        .setAdmin(admin)
        .setMetadata(metadata);
      membersList.forEach(({ address, weight, metadata }) => {
        msgCreateGroup.addMembers(
          new MemberRequest()
            .setAddress(address)
            .setWeight(weight)
            .setMetadata(metadata)
        );
      });
      return msgCreateGroup;
    }

    case 'MsgExecuteContract': {
      const { sender, contract, msg, fundsList } =
        params as MsgExecuteContractParams;
      const msgExecuteContract = new MsgExecuteContract()
        .setContract(contract)
        .setSender(sender)
        .setMsg(encoder.encode(JSON.stringify(msg)));
      if (fundsList)
        fundsList.forEach(({ denom, amount }) => {
          msgExecuteContract.addFunds(
            new Coin().setAmount(`${amount}`).setDenom(denom)
          );
        });
      return msgExecuteContract;
    }
  }
};

export const createAnyMessageBase64 = (
  type: ReadableMessageNames,
  msg: Message
): string => {
  const msgAny = new google_protobuf_any_pb.Any();
  msgAny.pack(msg.serializeBinary(), TYPE_NAMES_READABLE_MAP[type], '/');
  return bytesToBase64(msgAny.serializeBinary());
};

export const msgAnyB64toAny = (msgAnyB64: string): google_protobuf_any_pb.Any => {
  return google_protobuf_any_pb.Any.deserializeBinary(base64ToBytes(msgAnyB64));
};

type BuildBroadcastTxRequestProps = BuildTxBodyProps & {
  account: BaseAccount;
  gasPriceDenom?: string;
  gasLimit: number;
  gasAdjustment?: number;
  feeGranter?: string;
  feePayer?: string;
  chainId: string;
  wallet: Wallet;
  feeEstimate: CoinAsObject[];
  feeDenom: string;
};

export const buildBroadcastTxRequest = ({
  msgAny,
  account,
  chainId,
  wallet,
  feeEstimate,
  memo = '',
  feeDenom = 'nhash',
  gasLimit,
  feeGranter,
  feePayer,
  timeoutHeight,
  extensionOptionsList,
  nonCriticalExtensionOptionsList,
}: BuildBroadcastTxRequestProps): BroadcastTxRequest => {
  const signerInfo = buildSignerInfo(account, wallet.publicKey);
  const authInfo = buildAuthInfo({
    signerInfo,
    feeDenom,
    feeEstimate,
    gasLimit,
    feeGranter,
    feePayer,
  });
  const txBody = buildTxBody({
    msgAny,
    memo,
    timeoutHeight,
    extensionOptionsList,
    nonCriticalExtensionOptionsList,
  });
  const txRaw = new TxRaw();
  txRaw.setBodyBytes(txBody.serializeBinary());
  txRaw.setAuthInfoBytes(authInfo.serializeBinary());
  const signDoc = buildSignDoc(account.getAccountNumber(), chainId, txRaw);
  const signature = signBytes(signDoc.serializeBinary(), wallet.privateKey);
  txRaw.setSignaturesList([signature]);
  const txRequest = new BroadcastTxRequest();
  txRequest.setTxBytes(txRaw.serializeBinary());
  txRequest.setMode(BroadcastMode.BROADCAST_MODE_BLOCK);
  return txRequest;
};

/**
 * Unpacks an anyMsgBase64 string to a formatted JSON object. The
 * display object templates are mapped to {@link SupportedMessageTypeNames}.
 * The display object returned contains a typeName field representing
 * the given SupportedMessageTypeNames type (i.e. cosmos.bank.v1beta1.MsgSend -> MsgSend).
 */
export const unpackDisplayObjectFromWalletMessage = (
  anyMsgBase64: string
): (
  | MsgSendDisplay
  | MsgExecuteContractDisplay
  | MsgSubmitProposalDisplay
  | GenericDisplay
) & {
  typeName: ReadableMessageNames | FallbackGenericMessageName;
} => {
  const msgBytes = base64ToBytes(anyMsgBase64);
  const msgAny = google_protobuf_any_pb.Any.deserializeBinary(msgBytes);
  const typeName = msgAny.getTypeName() as SupportedMessageTypeNames;
  if (MESSAGE_PROTOS[typeName]) {
    const message = msgAny.unpack(
      MESSAGE_PROTOS[typeName].deserializeBinary,
      typeName
    );
    switch (typeName) {
      case 'cosmos.bank.v1beta1.MsgSend':
        return {
          typeName: 'MsgSend',
          ...(message as MsgSend).toObject(),
        };
      case 'cosmos.gov.v1.MsgVote': {
        const content = message as MsgVote;
        // Create a readable version of the Vote Option Enum
        const voteOptions = Object.keys(VoteOption).map((option) => option);
        return {
          typeName: 'MsgVote',
          proposalId: content.getProposalId(),
          voter: content.getVoter(),
          option: voteOptions[content.getOption()],
        };
      }
      case 'cosmos.gov.v1.MsgVoteWeighted': {
        const content = message as MsgVoteWeighted;
        // Create a readable version of the Vote Option Enum
        const voteOptions = Object.keys(VoteOption).map((option) => option);
        return {
          typeName: 'MsgVoteWeighted',
          proposalId: content.getProposalId(),
          voter: content.getVoter(),
          optionsList: content.getOptionsList().map((item) => ({
            option: voteOptions[item.getOption()],
            weight: `${Number(item.getWeight()) / 1e16}%`,
          })),
        };
      }
      case 'cosmwasm.wasm.v1.MsgExecuteContract':
        return {
          typeName: 'MsgExecuteContractGeneric',
          sender: (message as MsgExecuteContract).getSender(),
          msg: JSON.parse(
            decoder.decode((message as MsgExecuteContract).getMsg() as Uint8Array)
          ),
          fundsList: (message as MsgExecuteContract).getFundsList().map((coin) => ({
            denom: coin.getDenom(),
            amount: Number(coin.getAmount()),
          })),
        };
      case 'provenance.marker.v1.MsgAddMarkerRequest':
        const getKey = (map: { [key: string]: any }, val: any) =>
          Object.keys(map).find((key) => map[key] === val);

        return {
          typeName: 'MsgAddMarkerRequest',
          ...(message as MsgAddMarkerRequest).toObject(),
          markerType: getKey(
            MarkerType,
            (message as MsgAddMarkerRequest).getMarkerType()
          ),
          status: getKey(MarkerStatus, (message as MsgAddMarkerRequest).getStatus()),
          accessListList: (message as MsgAddMarkerRequest)
            .getAccessListList()
            .map((list) => {
              return {
                address: list.getAddress(),
                permissionsList: list
                  .getPermissionsList()
                  .map((perm) => getKey(Access, perm)),
              };
            }),
        };
      case 'cosmos.gov.v1.MsgSubmitProposal': {
        const msgContent = message as MsgSubmitProposal;
        const messagesList = msgContent.getMessagesList();
        const depositList = msgContent.getInitialDepositList();
        return {
          typeName: 'MsgSubmitProposal',
          proposer: msgContent.getProposer(),
          // If no deposits, show a 0 value
          initialDepositList:
            depositList.length > 0
              ? depositList.map((coin) => ({
                  denom: coin.getDenom(),
                  amount: coin.getAmount(),
                }))
              : { denom: 'nhash', amount: '0' },
          messages: messagesList.map((msg) => {
            const typeName = msg.getTypeName() as SupportedMessageTypeNames;
            // Check if the msg type is legacy content
            if (typeName === 'cosmos.gov.v1.MsgExecLegacyContent') {
              const unpackedMsg = msg.unpack(
                MESSAGE_PROTOS[typeName].deserializeBinary,
                typeName
              );
              const subMessage = (unpackedMsg as MsgExecLegacyContent).getContent();
              const subMessageTypeName =
                subMessage?.getTypeName() as SupportedMessageTypeNames;
              if (MESSAGE_PROTOS[subMessageTypeName]) {
                const msgContent = subMessage?.unpack(
                  MESSAGE_PROTOS[subMessageTypeName].deserializeBinary,
                  subMessageTypeName
                );
                switch (subMessageTypeName) {
                  case 'cosmos.gov.v1beta1.TextProposal': {
                    const content = msgContent as TextProposal;
                    return {
                      proposalType: 'Text Proposal',
                      title: content.getTitle(),
                      description: content.getDescription(),
                    };
                  }
                  case 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal': {
                    const content = msgContent as SoftwareUpgradeProposal;
                    const plan = content.getPlan();
                    return {
                      proposalType: 'Software Upgrade Proposal',
                      title: content.getTitle(),
                      description: content.getDescription(),
                      plan: {
                        name: plan?.getName(),
                        height: plan?.getHeight(),
                        info: plan?.getInfo(),
                      },
                    };
                  }
                  case 'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal': {
                    const content = msgContent as CancelSoftwareUpgradeProposal;
                    return {
                      proposalType: 'Cancel Software Upgrade Proposal',
                      title: content.getTitle(),
                      description: content.getDescription(),
                    };
                  }
                  case 'cosmwasm.wasm.v1.StoreCodeProposal': {
                    const content = msgContent as StoreCodeProposal;
                    const instantiatePerms = content.getInstantiatePermission();
                    // First, create a local object of the enum values so
                    // they can be easily displayed
                    const localEnum = Object.keys(AccessType).map((type) => type);
                    console.log(localEnum);
                    // Check permission type. If an address list, we need to display it correctly
                    const permissionType =
                      localEnum[Number(instantiatePerms?.getPermission())];
                    console.log(instantiatePerms?.getPermission());
                    return {
                      proposalType: 'Store Code Proposal',
                      title: content.getTitle(),
                      description: content.getDescription(),
                      runAs: content.getRunAs(),
                      wasmByteCode: content.getWasmByteCode_asB64(),
                      // If no permission type, omit this field
                      ...(permissionType && {
                        instantiatePermission: {
                          address: instantiatePerms?.getAddress(),
                          permission: permissionType,
                          // Conditionally return address list if permissioned
                          ...(permissionType === 'ACCESS_TYPE_ANY_OF_ADDRESSES' && {
                            permissionList: instantiatePerms
                              ?.getAddressesList()
                              .map((address, index) => {
                                address;
                              }),
                          }),
                        },
                      }),
                    };
                  }
                  case 'cosmwasm.wasm.v1.InstantiateCodeProposal': {
                    const content = msgContent as InstantiateContractProposal;
                    return {
                      proposalType: 'Instantiate Code Proposal',
                      title: content.getTitle(),
                      description: content.getDescription(),
                      runAs: content.getRunAs(),
                      admin: content.getAdmin(),
                      codeId: content.getCodeId(),
                      label: content.getLabel(),
                      msg: content.getMsg_asB64(),
                      fundsList: content.getFundsList().map((coin) => ({
                        denom: coin.getDenom(),
                        amount: Number(coin.getAmount()),
                      })),
                    };
                  }
                  case 'cosmos.params.v1beta1.ParameterChangeProposal': {
                    const content = msgContent as ParameterChangeProposal;
                    return {
                      proposalType: 'Parameter Change Proposal',
                      title: content.getTitle(),
                      description: content.getDescription(),
                      changesList: content.getChangesList().map((change) => ({
                        subspace: change.getSubspace(),
                        key: change.getKey(),
                        value: change.getValue(),
                      })),
                    };
                  }
                  default:
                    return {
                      proposalType: subMessageTypeName,
                      ...msgContent,
                    };
                }
              }
            }
            // If the typeName isn't support, don't fail, just return the message unformatted
            return {
              typeName,
              msg,
            };
          }),
        };
      }
      default:
        return {
          typeName: 'MsgGeneric',
          ...(message as Message).toObject(),
        };
    }
  }
  throw new Error(`Message type: ${typeName} is not supported for display.`);
};

const recurseFormatDisplayValue = (
  finalFlattenedDisplayObject: { [key: string]: any },
  currDisplayObject: { [key: string]: any },
  parentKey?: string
) => {
  Object.entries(currDisplayObject).forEach(([key, value]) => {
    const isStringOrNumberOrBool = ['string', 'number', 'boolean'].includes(
      typeof value
    );
    const isArrayOfObjects = isMatching(P.array({}), value);
    const isArrayOfStringsOrNumbersOrBools =
      isMatching(P.array(P.string), value) ||
      isMatching(P.array(P.string), value) ||
      isMatching(P.array(P.boolean), value);

    let currentFormattedValue: any;
    try {
      if (isStringOrNumberOrBool) {
        currentFormattedValue = formatSingleValue(value);
      } else {
        currentFormattedValue = formatCustomObj(key, value);
      }
    } catch (e) {
      console.error(e);
    }

    if (currentFormattedValue !== null) {
      parentKey
        ? (finalFlattenedDisplayObject[parentKey][key] = currentFormattedValue)
        : (finalFlattenedDisplayObject[key] = currentFormattedValue);
      return;
    }

    // Arrays are displayed as space delimited single values or recursed again.
    if (isArrayOfObjects || isArrayOfStringsOrNumbersOrBools) {
      // Array is all string/numbers (combine and display)
      if (isArrayOfStringsOrNumbersOrBools) {
        const currentFieldCombinedValue = value
          .map((v) => formatSingleValue(v))
          .join(`\n`);
        parentKey
          ? (finalFlattenedDisplayObject[parentKey][key] = currentFieldCombinedValue)
          : (finalFlattenedDisplayObject[key] = currentFieldCombinedValue);
        return;
      }
      // Array needs additional looping (object/array children)
      else {
        (value as any).forEach((cfArrayVal: any, index: number) => {
          const newCfName = value.length > 1 ? `${key} ${index + 1}` : key;
          finalFlattenedDisplayObject[newCfName] = {};
          recurseFormatDisplayValue(
            finalFlattenedDisplayObject,
            cfArrayVal,
            newCfName
          );
          return;
        });
      }
    }
    // Objects are also recursed again and passed a parent key.
    else {
      finalFlattenedDisplayObject[key] = {};
      recurseFormatDisplayValue(finalFlattenedDisplayObject, value, key);
      return;
    }
  });
};

/**
 * Formats a display object from {@link unpackDisplayObjectFromWalletMessage} by
 * recursing through the nested json object and formatting values based on
 * formatting functions {@link formatSingleValue} and {@link formatCustomObj}
 * that match keys and/or values to specific tests.
 */
export const formatDisplayObject = ({
  displayObject,
}: {
  displayObject: { [key: string]: any };
}) => {
  const finalMessage = {};
  if (displayObject) {
    Object.values(displayObject).reduce(
      () => recurseFormatDisplayValue(finalMessage, displayObject),
      {}
    );
  }

  return finalMessage;
};
