import { BaseAccount } from '../../../proto/cosmos/auth/v1beta1/auth_pb';
import { CalculateTxFeesRequest } from '../../../proto/provenance/msgfees/v1/query_pb';
import { TxRaw } from '../../../proto/cosmos/tx/v1beta1/tx_pb';
import type { Bytes } from '@tendermint/types';
import { buildAuthInfo } from './buildAuthInfo';
import { buildSignerInfo } from './buildSignerInfo';
import { buildTxBody } from './buildTxBody';
import { BuildTxBodyProps } from './buildBroadcastTxRequest';

type CalculateTxFeesRequestParams = BuildTxBodyProps & {
  account: BaseAccount;
  publicKey: Bytes;
  gasPriceDenom?: string;
  gasLimit: number;
  gasAdjustment?: number;
  feeGranter?: string;
  feePayer?: string;
};

/**  Builds a request to calculate the transaction
 * fees associated with the message.
 * @param msgAny any valid Provenance message
 * @param account the account number sending the message
 * @param publicKey the account public key, as a byte array (Uint8Array).
 * Developers can use the bufferToBytes function from @tendermint/belt
 * @param gasPriceDenom the denom of the fee
 * @param gasLimit the maximum gas that can be used in transaction processing
 * @param feeGranter if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
 * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
 * not support fee grants, this will fail
 * @param feePayer if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
 * The payer must be a tx signer (and thus have signed this field in AuthInfo).
 * Setting this field does *not* change the ordering of required signers for the transaction
 * @param memo any arbitrary note/comment to be added to the transaction
 * @param timeoutHeight the block height after which this transaction will not
 * be processed by the chain
 * @param extensionOptionsList arbitrary options that can be added by chains
 * when the default options are not sufficient. If any of these are present
 * and can't be handled, the transaction will be rejected
 * @param nonCriticalExtensionOptionsList arbitrary options that can be added by chains
 * when the default options are not sufficient. If any of these are present
 * and can't be handled, they will be ignored
 * Read more at https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc1/proto/cosmos/tx/v1beta1/tx.proto#L13-L26
 */
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
