import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { Message } from 'google-protobuf';
import { bytesToBase64 } from '@tendermint/belt';
import { ReadableMessageNames, TYPE_NAMES_READABLE_MAP } from '../../types';

/**
 * Returns a base64 encoded string of the provided message.
 * @param type the type of the message. If message type is unsupported,
 * update ReadableMessageNames in types.
 * @param msg the message to convert to base64.
 * @returns a base 64 string of the provided message
 */
export const createAnyMessageBase64 = (
  type: ReadableMessageNames,
  msg: Message
): string => {
  const msgAny = new google_protobuf_any_pb.Any();
  msgAny.pack(msg.serializeBinary(), TYPE_NAMES_READABLE_MAP[type], '/');
  return bytesToBase64(msgAny.serializeBinary());
};
