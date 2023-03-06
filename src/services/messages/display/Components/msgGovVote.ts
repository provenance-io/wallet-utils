import { MsgVote } from '../../../../proto/cosmos/gov/v1/tx_pb';
import { ReadableMessageNames } from 'types';
import { govVoteOptions } from '../../../../utils';

/**
 * Formats MsgVote (gov) messages for display
 * @param message of type MsgVote (gov)
 * @returns object with MsgVote fields
 */
export const msgGovVote = (message: MsgVote) => ({
  typeName: 'MsgVote' as ReadableMessageNames,
  proposalId: message.getProposalId(),
  voter: message.getVoter(),
  option: govVoteOptions[message.getOption()],
});
