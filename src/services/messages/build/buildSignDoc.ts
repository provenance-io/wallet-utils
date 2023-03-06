import { TxRaw, SignDoc } from '../../../proto/cosmos/tx/v1beta1/tx_pb';

/**
 * Builds the SignDoc, which is the type used for generating sign bytes
 * for SIGN_MODE_DIRECT
 * @param accNumber the account number of the account in state
 * @param chainId the unique identifier of the chain this transaction targets.
 * It prevents signed transactions from being used on another chain by an
 * attacker
 * @param txRaw a variant of Tx that pins the signer's exact binary
 * representation of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 * @returns The SignDoc type used for generating sign bytes for SIGN_MODE_DIRECT
 * reference: https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc1/proto/cosmos/tx/v1beta1/tx.proto#L13-L26
 */
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
