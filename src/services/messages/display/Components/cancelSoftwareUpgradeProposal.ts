import { CancelSoftwareUpgradeProposal } from '../../../../proto/cosmos/upgrade/v1beta1/upgrade_pb';
import { ReadableMessageNames } from 'types';

/**
 * Formats CancelSoftwareUpgradeProposal messages for display
 * @param message of type CancelSoftwareUpgradeProposal
 * @returns object with CancelSoftwareUpgradeProposal fields
 */
export const cancelSoftwareUpgradeProposal = (
  message: CancelSoftwareUpgradeProposal
) => ({
  proposalType: 'Cancel Software Upgrade Proposal' as ReadableMessageNames,
  title: message.getTitle(),
  description: message.getDescription(),
});
