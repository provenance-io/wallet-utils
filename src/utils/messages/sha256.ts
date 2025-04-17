import { sha256 as nobleSha256 } from '@noble/hashes/sha256';
import type { Bytes } from '@tendermint/types';
import { bufferToBytes } from '@tendermint/belt';

/**
 * sha256 encryption of a byte array without using Node.js crypto
 * @param bytes a byte array (Uint8Array)
 * @returns a sha256 encrypted version of the given byte array
 */
export const sha256 = (bytes: Bytes): Bytes => {
  const input = bytes instanceof Buffer ? new Uint8Array(bytes) : bytes;
  const hash = nobleSha256(input);
  return bufferToBytes(Buffer.from(hash));
};
