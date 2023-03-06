import { ReadableMessageNames } from 'types';
import { execOptions } from '../../../../utils';
import { MsgSubmitProposal } from '../../../../proto/cosmos/group/v1/tx_pb';

/**
 * Formats MsgSubmitProposal (group) messages for display
 * @param message of type MsgSubmitProposal (group)
 * @returns object with MsgSubmitProposal fields
 */
export const msgSubmitGroupProposal = (message: MsgSubmitProposal) => ({
  typeName: 'MsgSubmitGroupProposal' as ReadableMessageNames,
  groupPolicyAddress: message.getGroupPolicyAddress(),
  proposersList: message.getProposersList().map((proposer) => proposer),
  metadata: message.getMetadata(),
  exec: execOptions[message.getExec()],
  // Note that messageList is handled in the calling function
  // due to the recursive call to unpack messages
});
