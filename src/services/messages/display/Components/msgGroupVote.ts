import { ReadableMessageNames } from 'types';
import { execOptions, groupVoteOptions } from '../../../../utils';
import { MsgVote } from '../../../../proto/cosmos/group/v1/tx_pb';

/**
 * Formats MsgVote (group) messages for display
 * @param message of type MsgVote (group)
 * @returns object with MsgVote fields
 */
export const msgGroupVote = (message: MsgVote) => ({
  typeName: 'MsgGroupVote' as ReadableMessageNames,
  proposalId: message.getProposalId(),
  voter: message.getVoter(),
  option: groupVoteOptions[message.getOption()],
  metadata: message.getMetadata(),
  exec: execOptions[message.getExec()],
});
