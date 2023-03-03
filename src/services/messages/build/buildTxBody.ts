import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { TxBody } from '../../../proto/cosmos/tx/v1beta1/tx_pb';

interface BuildTxBodyProps {
  msgAny: google_protobuf_any_pb.Any | google_protobuf_any_pb.Any[];
  extensionOptionsList?: google_protobuf_any_pb.Any[];
  nonCriticalExtensionOptionsList?: google_protobuf_any_pb.Any[];
  memo?: string;
  timeoutHeight?: number;
}

/**
 * Builds the body for a transaction
 * @param msgAny: A list of messages to be executed
 * @param memo: Optional arbitrary note/comment to be added to the transaction
 * @param timeoutHeight: the block height after which this transaction will not
 * be processed by the chain
 * @param extensionOptionsList: arbitrary options that can be added by chains
 * when the default options are not sufficient. If any of these are present
 * and can't be handled, the transaction will be rejected
 * @param nonCriticalExtensionOptionsList: extension_options are arbitrary
 * options that can be added by chains when the default options are not
 * sufficient. If any of these are present and can't be handled, they will be
 * ignored
 * @returns Body of a transaction that all signers sign over
 * reference: https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc1/proto/cosmos/tx/v1beta1/tx.proto#L13-L26
 */
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
