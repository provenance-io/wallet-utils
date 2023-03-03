import { MsgSend } from '../../../../proto/cosmos/bank/v1beta1/tx_pb';
import { ReadableMessageNames } from 'types';

/**
 * Formats MsgSend (bank) messages for display
 * @param message of type MsgSend (bank)
 * @returns object with MsgSend fields
 */
export const msgSend = (message: MsgSend) => ({
  typeName: 'MsgSend' as ReadableMessageNames,
  ...message.toObject(),
});
