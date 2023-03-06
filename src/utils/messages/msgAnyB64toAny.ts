import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { base64ToBytes } from '@tendermint/belt';

/**
 * Converts a base64 message into a google proto
 * @param msgAnyB64 base64 encoded string
 * @returns google proto of the provided base64 message string
 */
export const msgAnyB64toAny = (msgAnyB64: string): google_protobuf_any_pb.Any => {
  return google_protobuf_any_pb.Any.deserializeBinary(base64ToBytes(msgAnyB64));
};
