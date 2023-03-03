import { ReadableMessageNames } from 'types';
import { TextProposal } from '../../../../proto/cosmos/gov/v1beta1/gov_pb';

/**
 * Formats TextProposal messages for display
 * @param message of type TextProposal
 * @returns object with TextProposal fields
 */
export const textProposal = (message: TextProposal) => ({
  proposalType: 'Text Proposal' as ReadableMessageNames,
  title: message.getTitle(),
  description: message.getDescription(),
});
