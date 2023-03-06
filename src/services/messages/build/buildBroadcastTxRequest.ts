import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { BaseAccount } from '../../../proto/cosmos/auth/v1beta1/auth_pb';
import {
  BroadcastTxRequest,
  BroadcastMode,
} from '../../../proto/cosmos/tx/v1beta1/service_pb';
import { TxRaw } from '../../../proto/cosmos/tx/v1beta1/tx_pb';
import { Wallet } from '@tendermint/sig';
import { CoinAsObject } from '../../../types';
import { buildAuthInfo } from './buildAuthInfo';
import { buildSignDoc } from './buildSignDoc';
import { buildSignerInfo } from './buildSignerInfo';
import { buildTxBody } from './buildTxBody';
import { signBytes } from '../../../utils';

export interface BuildTxBodyProps {
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[];
  extensionOptionsList?: google_protobuf_any_pb.Any[];
  nonCriticalExtensionOptionsList?: google_protobuf_any_pb.Any[];
  memo?: string;
  timeoutHeight?: number;
}

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

/**
 * Builds the BroadcastTxRequest, the request type for the
 * Service.BroadcastTxRequest RPC method
 * @param msgAny any valid Provenance message
 * @param account the account number sending the message
 * @param chainId the unique identifier of the chain this transaction targets.
 * It prevents signed transactions from being used on another chain by an
 * attacker
 * @param wallet the signing wallet. Used to identify the private key for
 * signature
 * @param feeEstimate the estimated fee
 * @param memo any arbitrary note/comment to be added to the transaction
 * @param feeDenom the denom of the fee. Not required
 * @param gasLimit the maximum gas that can be used in transaction processing
 * @param feeGranter if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
 * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
 * not support fee grants, this will fail
 * @param feePayer if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
 * The payer must be a tx signer (and thus have signed this field in AuthInfo).
 * Setting this field does *not* change the ordering of required signers for the transaction
 * @param timeoutHeight the block height after which this transaction will not
 * be processed by the chain
 * @param extensionOptionsList arbitrary options that can be added by chains
 * when the default options are not sufficient. If any of these are present
 * and can't be handled, the transaction will be rejected
 * @param nonCriticalExtensionOptionsList arbitrary options that can be added by chains
 * when the default options are not sufficient. If any of these are present
 * and can't be handled, they will be ignored
 * @returns the BroadCastTxRequest
 * reference: https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc1/proto/cosmos/tx/v1beta1/tx.proto#L13-L26
 */
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
