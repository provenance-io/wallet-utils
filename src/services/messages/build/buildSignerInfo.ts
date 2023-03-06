import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { BaseAccount } from '../../../proto/cosmos/auth/v1beta1/auth_pb';
import type { Bytes } from '@tendermint/types';
import { ModeInfo, SignerInfo } from '../../../proto/cosmos/tx/v1beta1/tx_pb';
import { SignMode } from '../../../proto/cosmos/tx/signing/v1beta1/signing_pb';
import { PubKey } from '../../../proto/cosmos/crypto/secp256k1/keys_pb';
import { TYPE_NAMES_READABLE_MAP } from '../../../types';

/** Builds the SignerInfo messages, which describes the public key and
 * signing mode of a single top-level signer
 * @param baseAccount: The base account used for signatures. This provides
 * the signer sequence. The sequence is the sequence of the account, which
 * describes the number of committed transactions signed by a given address.
 * It is used to prevent replay attacks.
 * @param pubKeyBytes: The public key of the signer as a Uint8Array. It is
 * optional for accounts that already exist in state. If unset, the verifier
 * can use the required signer address for this position and lookup the public
 * key.
 * reference: https://github.com/cosmos/cosmos-sdk/blob/v0.47.0-rc1/proto/cosmos/tx/v1beta1/tx.proto#L13-L26
 */
export const buildSignerInfo = (
  baseAccount: BaseAccount,
  pubKeyBytes: Bytes
): SignerInfo => {
  // mode_info describes the signing mode of the signer and is a nested
  // structure to support nested multisig pubkey's. This function only
  // supports single signer functionality.
  const single = new ModeInfo.Single();
  single.setMode(SignMode.SIGN_MODE_DIRECT);
  const modeInfo = new ModeInfo();
  modeInfo.setSingle(single);
  const signerInfo = new SignerInfo();
  const pubKey = new PubKey();
  pubKey.setKey(pubKeyBytes);
  const pubKeyAny = new google_protobuf_any_pb.Any();
  pubKeyAny.pack(pubKey.serializeBinary(), TYPE_NAMES_READABLE_MAP.PubKey, '/');
  signerInfo.setPublicKey(pubKeyAny);
  signerInfo.setModeInfo(modeInfo);
  signerInfo.setSequence(baseAccount.getSequence());
  return signerInfo;
};
