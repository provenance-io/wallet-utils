import { InstantiateContractProposal } from '../../../../proto/cosmwasm/wasm/v1/proposal_legacy_pb';
import { ReadableMessageNames } from 'types';

/**
 * Formats InstantiateContractProposal messages for display
 * @param message of type InstantiateContractProposal
 * @returns object with InstantiateContractProposal fields
 */
export const instantiateCodeProposal = (message: InstantiateContractProposal) => ({
  proposalType: 'Instantiate Code Proposal' as ReadableMessageNames,
  title: message.getTitle(),
  description: message.getDescription(),
  runAs: message.getRunAs(),
  admin: message.getAdmin(),
  codeId: message.getCodeId(),
  label: message.getLabel(),
  msg: message.getMsg_asB64(),
  fundsList: message.getFundsList().map((coin) => ({
    denom: coin.getDenom(),
    amount: Number(coin.getAmount()),
  })),
});
