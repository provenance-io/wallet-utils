import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { Message } from 'google-protobuf';
import type { Bytes } from '@tendermint/types';
import { base64ToBytes, bytesToBase64 } from '@tendermint/belt';
import {
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

export const buildCalculateTxFeeRequest = (
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[],
  account: BaseAccount,
  publicKey: Bytes,
  gasPriceDenom: SupportedDenoms = 'nhash',
  gasPrice: number,
  gasAdjustment = 1.25
): CalculateTxFeesRequest => {
  const signerInfo = buildSignerInfo(account, publicKey);
  const authInfo = buildAuthInfo(signerInfo, gasPriceDenom, undefined, gasPrice);
  const txBody = buildTxBody(msgAny);
  const txRaw = new TxRaw();
  txRaw.setBodyBytes(txBody.serializeBinary());
  txRaw.setAuthInfoBytes(authInfo.serializeBinary());
  txRaw.setSignaturesList([]);

  const calculateTxFeeRequest = new CalculateTxFeesRequest();
  calculateTxFeeRequest.setTxBytes(txRaw.serializeBinary());
  calculateTxFeeRequest.setDefaultBaseDenom(gasPriceDenom);
  calculateTxFeeRequest.setGasAdjustment(gasAdjustment);
  return calculateTxFeeRequest;
};

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
