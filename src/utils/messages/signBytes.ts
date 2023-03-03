import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';
import type { Bytes } from '@tendermint/types';
import { sha256 } from './sha256';

/**
 * sha256 encrypted, ECDSA signed version of the given byte array
 * @param bytes byte array (Uint8Array) to encrypt and sign
 * @param privateKey private key to sign with
 * @returns a sha256 encrypted, ECDSA signed version of the given byte array
 */
export const signBytes = (bytes: Uint8Array, privateKey: Bytes): Uint8Array => {
  const hash = sha256(bytes);
  const { signature } = secp256k1EcdsaSign(hash, privateKey);

  return signature;
};
