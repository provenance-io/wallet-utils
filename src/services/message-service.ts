import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { Message } from 'google-protobuf';
import type { Wallet } from '@tendermint/sig';
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
  MsgSendDisplay,
  MsgSetWithdrawAddressDisplay,
  MsgSubmitEvidenceDisplay,
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
  SupportedDenoms,
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
import { MsgAddMarkerRequest } from 'proto/provenance/marker/v1/tx_pb';
import { MarkerStatus, MarkerType } from 'proto/provenance/marker/v1/marker_pb';

export type GenericDisplay = { [key: string]: any };

export type MsgExecuteContractDisplay = {
  sender: string;
  msg: any;
  fundsList: CoinAsObject[];
};

export type FallbackGenericMessageName = 'MsgGeneric' | 'MsgExecuteContractGeneric';

export const buildAuthInfo = (
  signerInfo: SignerInfo,
  feeDenom: SupportedDenoms,
  feeEstimate = 0,
  gasEstimate: number
): AuthInfo => {
  const feeCoin = new Coin();
  feeCoin.setDenom(feeDenom);
  feeCoin.setAmount(feeEstimate.toString());
  const fee = new Fee();
  fee.setAmountList([feeCoin]);
  fee.setGasLimit(gasEstimate);
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

export const buildTxBody = (
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[],
  memo: string = ''
): TxBody => {
  const txBody = new TxBody();
  if (Array.isArray(msgAny)) txBody.setMessagesList(msgAny);
  else txBody.addMessages(msgAny);
  txBody.setMemo(memo);
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

interface CalculateTxFeesRequestParams {
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[];
  account: BaseAccount;
  publicKey: Bytes;
  gasPriceDenom?: SupportedDenoms;
  gasPrice: number;
  gasAdjustment?: number;
}

export const buildCalculateTxFeeRequest = ({
  msgAny,
  account,
  publicKey,
  gasPriceDenom = 'nhash',
  gasPrice,
  gasAdjustment = 1.25,
}: CalculateTxFeesRequestParams): CalculateTxFeesRequest => {
  const signerInfo = buildSignerInfo(account, publicKey);
  const authInfo = buildAuthInfo(signerInfo, gasPriceDenom, undefined, gasPrice);
  const txBody = buildTxBody(msgAny);
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
      // log(`Building MsgSend: ${fromAddress} to ${toAddress}`);
      const msgSend = new MsgSend()
        .setFromAddress(fromAddress)
        .setToAddress(toAddress);
      amountList.forEach(({ denom, amount }) => {
        msgSend.addAmount(new Coin().setAmount(`${amount}`).setDenom(denom));
      });
      return msgSend;
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

interface buildBroadcastTxRequestProps {
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[];
  account: BaseAccount;
  chainId: string;
  wallet: Wallet;
  feeEstimate: number;
  memo: string;
  feeDenom: SupportedDenoms;
  gasEstimate: number;
}

export const buildBroadcastTxRequest = ({
  msgAny,
  account,
  chainId,
  wallet,
  feeEstimate,
  memo = '',
  feeDenom = 'nhash',
  gasEstimate,
}: buildBroadcastTxRequestProps): BroadcastTxRequest => {
  console.log(`Building tx request for broadcast`);
  const signerInfo = buildSignerInfo(account, wallet.publicKey);
  const authInfo = buildAuthInfo(signerInfo, feeDenom, feeEstimate, gasEstimate);
  const txBody = buildTxBody(msgAny, memo);
  const txRaw = new TxRaw();
  txRaw.setBodyBytes(txBody.serializeBinary());
  txRaw.setAuthInfoBytes(authInfo.serializeBinary());
  const signDoc = buildSignDoc(account.getAccountNumber(), chainId, txRaw);
  const signature = signBytes(signDoc.serializeBinary(), wallet.privateKey);
  // const verified = chainService.verifyTx(signDocBinary, bytesToBase64(wallet.publicKey), signature);
  txRaw.setSignaturesList([signature]);
  const txRequest = new BroadcastTxRequest();
  txRequest.setTxBytes(txRaw.serializeBinary());
  txRequest.setMode(BroadcastMode.BROADCAST_MODE_SYNC);
  return txRequest;
};

export const unpackDisplayObjectFromWalletMessage = (
  anyMsgBase64: string
): (MsgSendDisplay | MsgExecuteContractDisplay | GenericDisplay) & {
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
        };
      default:
        return {
          typeName: 'MsgGeneric',
          ...(message as Message).toObject(),
        };
    }
  }
  throw new Error(`Message type: ${typeName} is not supported for display.`);
};
