import { SoftwareUpgradeProposal } from '../../../../proto/cosmos/upgrade/v1beta1/upgrade_pb';
import { ReadableMessageNames } from 'types';

/**
 * Formats SoftwareUpgradeProposal messages for display
 * @param message of type SoftwareUpgradeProposal
 * @returns object with SoftwareUpgradeProposal fields
 */
export const softwareUpgradeProposal = (message: SoftwareUpgradeProposal) => {
  const plan = message.getPlan();
  return {
    proposalType: 'Software Upgrade Proposal' as ReadableMessageNames,
    title: message.getTitle(),
    description: message.getDescription(),
    plan: {
      name: plan?.getName(),
      height: plan?.getHeight(),
      info: plan?.getInfo(),
    },
  };
};
