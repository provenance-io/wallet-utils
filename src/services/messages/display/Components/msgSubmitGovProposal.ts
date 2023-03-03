import {
  MESSAGE_PROTOS,
  ReadableMessageNames,
  SupportedMessageTypeNames,
} from '../../../../types';
import {
  MsgExecLegacyContent,
  MsgSubmitProposal,
} from '../../../../proto/cosmos/gov/v1/tx_pb';
import { TextProposal } from '../../../../proto/cosmos/gov/v1beta1/gov_pb';
import {
  CancelSoftwareUpgradeProposal,
  SoftwareUpgradeProposal,
} from '../../../../proto/cosmos/upgrade/v1beta1/upgrade_pb';
import {
  InstantiateContractProposal,
  StoreCodeProposal,
} from '../../../../proto/cosmwasm/wasm/v1/proposal_pb';
import { ParameterChangeProposal } from '../../../../proto/cosmos/params/v1beta1/params_pb';
import { cancelSoftwareUpgradeProposal } from './cancelSoftwareUpgradeProposal';
import { instantiateCodeProposal } from './instantiateCodeProposal';
import { parameterChangeProposal } from './parameterChangeProposal';
import { softwareUpgradeProposal } from './softwareUpgradeProposal';
import { storeCodeProposal } from './storeCodeProposal';
import { textProposal } from './textProposal';

/**
 * Formats MsgSubmitProposal (gov) messages for display
 * @param message of type MsgSubmitProposal (gov)
 * @returns object with MsgSubmitProposal fields
 */
export const msgSubmitGovProposal = (message: MsgSubmitProposal) => {
  const messagesList = message.getMessagesList();
  const depositList = message.getInitialDepositList();
  return {
    typeName: 'MsgSubmitProposal' as ReadableMessageNames,
    proposer: message.getProposer(),
    // If no deposits, show a 0 value
    initialDepositList:
      depositList.length > 0
        ? depositList.map((coin) => ({
            denom: coin.getDenom(),
            amount: coin.getAmount(),
          }))
        : { denom: 'nhash', amount: '0' },
    messages: messagesList.map((msg) => {
      const typeName = msg.getTypeName() as SupportedMessageTypeNames;
      // Check if the msg type is legacy content
      if (typeName === 'cosmos.gov.v1.MsgExecLegacyContent') {
        const unpackedMsg = msg.unpack(
          MESSAGE_PROTOS[typeName].deserializeBinary,
          typeName
        );
        const subMessage = (unpackedMsg as MsgExecLegacyContent).getContent();
        const subMessageTypeName =
          subMessage?.getTypeName() as SupportedMessageTypeNames;
        if (MESSAGE_PROTOS[subMessageTypeName]) {
          const msgContent = subMessage?.unpack(
            MESSAGE_PROTOS[subMessageTypeName].deserializeBinary,
            subMessageTypeName
          );
          switch (subMessageTypeName) {
            case 'cosmos.gov.v1beta1.TextProposal':
              return textProposal(msgContent as TextProposal);
            case 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
              return softwareUpgradeProposal(msgContent as SoftwareUpgradeProposal);
            case 'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
              return cancelSoftwareUpgradeProposal(
                msgContent as CancelSoftwareUpgradeProposal
              );
            case 'cosmwasm.wasm.v1.StoreCodeProposal':
              return storeCodeProposal(msgContent as StoreCodeProposal);
            case 'cosmwasm.wasm.v1.InstantiateCodeProposal':
              return instantiateCodeProposal(
                msgContent as InstantiateContractProposal
              );
            case 'cosmos.params.v1beta1.ParameterChangeProposal':
              return parameterChangeProposal(msgContent as ParameterChangeProposal);
            default:
              return {
                proposalType: subMessageTypeName,
                ...msgContent,
              };
          }
        }
      }
      // If the typeName isn't supported, don't fail, just return the message unformatted
      else {
        return {
          typeName,
          msg,
        };
      }
    }),
  };
};
