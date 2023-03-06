import { ReadableMessageNames } from 'types';
import { ParameterChangeProposal } from '../../../../proto/cosmos/params/v1beta1/params_pb';

/**
 * Formats ParameterChangeProposal messages for display
 * @param message of type ParameterChangeProposal
 * @returns object with ParameterChangeProposal fields
 */
export const parameterChangeProposal = (message: ParameterChangeProposal) => ({
  proposalType: 'Parameter Change Proposal' as ReadableMessageNames,
  title: message.getTitle(),
  description: message.getDescription(),
  changesList: message.getChangesList().map((change) => ({
    subspace: change.getSubspace(),
    key: change.getKey(),
    value: change.getValue(),
  })),
});
