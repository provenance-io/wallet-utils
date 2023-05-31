import { SignerInfo, AuthInfo, Fee } from '../../../proto/cosmos/tx/v1beta1/tx_pb';
import { CoinAsObject } from '../../../types';
import { getCoinList } from '../../../utils';

interface BuildAuthInfo {
  signerInfo: SignerInfo;
  feeDenom: string;
  feeEstimate?: CoinAsObject[];
  gasLimit: number;
  feePayer?: string;
  feeGranter?: string;
}

/**
 * Builds the AuthInfo message.
 * @param signerInfo signer_infos defines the signing modes for the required
 * signers. The number and order of elements must match the required signers
 * from TxBody's messages. The first element is the primary signer and the one
 * which pays the fee.
 * @param feeDenom the denom of the fee. Not required
 * @param feeEstimate the estimated fee
 * @param gasLimit the maximum gas that can be used in transaction processing
 * @param feePayer if unset, the first signer is responsible for paying the
 * fees. If set, the specified account must pay the fees. The payer must be a tx
 * signer (and thus have signed this field in AuthInfo). Setting this field does
 * *not* change the ordering of required signers for the transaction.
 * @param feeGranter if set, the fee payer (either the first signer or the value
 * of the payer field) requests that a fee grant be used to pay fees instead of
 * the fee payer's own balance. If an appropriate fee grant does not exist or
 * the chain does not support fee grants, this will fail.
 * @returns AuthInfo message: describes the fee and signer modes that are used to
 * sign a transaction
 * reference: https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc1/proto/cosmos/tx/v1beta1/tx.proto#L13-L26
 */
export const buildAuthInfo = ({
  signerInfo,
  feeDenom,
  feeEstimate = [],
  gasLimit,
  feePayer,
  feeGranter,
}: BuildAuthInfo): AuthInfo => {
  const feeList = getCoinList(feeEstimate);
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
