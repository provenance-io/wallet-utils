import type { Bytes } from '@tendermint/types';
import { createHash } from 'crypto';
import { bufferToBytes } from '@tendermint/belt';

/**
 * sha256 encryption of a byte array
 * @param bytes a byte array (Uint8Array)
 * @returns a sha256 encryted version of the given byte array
 */
export const sha256 = (bytes: Bytes): Bytes => {
  const buffer1 = bytes instanceof Buffer ? bytes : Buffer.from(bytes);
  const buffer2 = createHash('sha256').update(buffer1).digest();

  return bufferToBytes(buffer2);
};
