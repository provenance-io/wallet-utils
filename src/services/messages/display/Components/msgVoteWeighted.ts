import { MsgVoteWeighted } from '../../../../proto/cosmos/gov/v1/tx_pb';
import { ReadableMessageNames } from 'types';
import { govVoteOptions } from '../../../../utils';

/**
 * Formats MsgVoteWeighted messages for display
 * @param message of type MsgVoteWeighted
 * @returns object with MsgVoteWeighted fields
 */
export const msgVoteWeighted = (message: MsgVoteWeighted) => ({
  typeName: 'MsgVoteWeighted' as ReadableMessageNames,
  proposalId: message.getProposalId(),
  voter: message.getVoter(),
  optionsList: message.getOptionsList().map((item) => ({
    option: govVoteOptions[item.getOption()],
    // Convert weight to a percent
    weight: `${Number(item.getWeight()) * 100}%`,
  })),
});
