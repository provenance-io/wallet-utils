import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import {
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
} from '../../../proto/cosmwasm/wasm/v1/tx_pb';
import {
  MsgBeginRedelegateDisplay,
  MsgCreateValidatorDisplay,
  MsgCreateVestingAccountDisplay,
  MsgDelegateDisplay,
  MsgDepositDisplay,
  MsgEditValidatorDisplay,
  MsgExecuteContractParams,
  MsgFundCommunityPoolDisplay,
  MsgGrantDisplay,
  MsgRevokeDisplay,
  MsgSendDisplay,
  MsgSetWithdrawAddressDisplay,
  MsgCreateGroupDisplay,
  MsgUpdateGroupMembersDisplay,
  MsgUpdateGroupAdminDisplay,
  MsgUpdateGroupMetadataDisplay,
  MsgCreateGroupPolicyDisplay,
  MsgUpdateGroupPolicyAdminDisplay,
  MsgCreateGroupWithPolicyDisplay,
  MsgUpdateGroupPolicyDecisionPolicyDisplay,
  MsgUpdateGroupPolicyMetadataDisplay,
  MsgSubmitGroupProposalDisplay,
  MsgWithdrawProposalDisplay,
  MsgGroupVoteDisplay,
  MsgExecDisplay,
  MsgLeaveGroupDisplay,
  MsgSubmitProposalDisplay,
  MsgUndelegateDisplay,
  MsgUnjailDisplay,
  MsgVerifyInvariantDisplay,
  MsgVoteDisplay,
  MsgVoteWeightedDisplay,
  MsgWithdrawDelegatorRewardDisplay,
  MsgWithdrawValidatorCommissionDisplay,
  MsgInstantiateContractDisplay,
  MsgInstantiateContract2Display,
  MsgRegisterFido2CredentialDisplay,
  ReadableMessageNames,
  MsgRegisterCosmosCredentialDisplay,
  MsgUpdateParamsDisplay,
  MsgDeleteCredentialDisplay,
  MsgDeleteAccountDisplay,
  MsgMigrateToSmartAccountAuthenticationDisplay,
} from '../../../types';
import { Coin } from '../../../proto/cosmos/base/v1beta1/coin_pb';
import { MsgSend } from '../../../proto/cosmos/bank/v1beta1/tx_pb';
import { MsgDelegate } from '../../../proto/cosmos/staking/v1beta1/tx_pb';
import {
  MsgCreateGroup,
  MsgSubmitProposal as MsgSubmitGroupProposal,
  MsgVote as MsgGroupVote,
  MsgExec as MsgGroupExec,
} from '../../../proto/cosmos/group/v1/tx_pb';
import { MemberRequest } from '../../../proto/cosmos/group/v1/types_pb';
import {
  MsgDeleteAccount,
  MsgDeleteCredential,
  MsgMigrateToSmartAccountAuthentication,
  MsgRegisterCosmosCredential,
  MsgRegisterFido2Credential
} from "../../../proto/provenance/smartaccounts/v1/tx_pb";
const encoder = new TextEncoder();

/**
 * builds the message for submission to the blockchain
 * @param type identifies the type of message being built
 * @param params the parameters of the message being built
 * @returns formatted message of the provided type
 */
export const buildMessage = (
  type: ReadableMessageNames,
  params:
    | MsgSendDisplay
    | MsgExecuteContractParams
    | MsgGrantDisplay
    | MsgRevokeDisplay
    | MsgVerifyInvariantDisplay
    | MsgSetWithdrawAddressDisplay
    | MsgWithdrawDelegatorRewardDisplay
    | MsgWithdrawValidatorCommissionDisplay
    | MsgFundCommunityPoolDisplay
    | MsgSubmitProposalDisplay
    | MsgVoteDisplay
    | MsgVoteWeightedDisplay
    | MsgDepositDisplay
    | MsgUnjailDisplay
    | MsgCreateValidatorDisplay
    | MsgEditValidatorDisplay
    | MsgDelegateDisplay
    | MsgBeginRedelegateDisplay
    | MsgUndelegateDisplay
    | MsgCreateVestingAccountDisplay
    | MsgCreateGroupDisplay
    | MsgUpdateGroupMembersDisplay
    | MsgUpdateGroupAdminDisplay
    | MsgUpdateGroupMetadataDisplay
    | MsgCreateGroupPolicyDisplay
    | MsgUpdateGroupPolicyAdminDisplay
    | MsgCreateGroupWithPolicyDisplay
    | MsgUpdateGroupPolicyDecisionPolicyDisplay
    | MsgUpdateGroupPolicyMetadataDisplay
    | MsgSubmitGroupProposalDisplay
    | MsgWithdrawProposalDisplay
    | MsgGroupVoteDisplay
    | MsgExecDisplay
    | MsgLeaveGroupDisplay
    | MsgInstantiateContractDisplay
    | MsgRegisterFido2CredentialDisplay
    | MsgRegisterCosmosCredentialDisplay
    | MsgUpdateParamsDisplay
    | MsgDeleteCredentialDisplay
    | MsgDeleteAccountDisplay
) => {
  switch (type) {
    case 'MsgDelegate': {
      const { delegatorAddress, validatorAddress, amount } =
        params as MsgDelegateDisplay;
      const msgDelegate = new MsgDelegate()
        .setDelegatorAddress(delegatorAddress)
        .setValidatorAddress(validatorAddress);
      if (amount) {
        msgDelegate.setAmount(
          new Coin().setAmount(`${amount.amount}`).setDenom(amount.denom)
        );
      }
      return msgDelegate;
    }

    case 'MsgSend': {
      const { fromAddress, toAddress, amountList } = params as MsgSendDisplay;
      const msgSend = new MsgSend()
        .setFromAddress(fromAddress)
        .setToAddress(toAddress);
      amountList.forEach(({ denom, amount }) => {
        msgSend.addAmount(new Coin().setAmount(`${amount}`).setDenom(denom));
      });
      return msgSend;
    }

    case 'MsgCreateGroup': {
      const { admin, membersList, metadata } = params as MsgCreateGroupDisplay;
      const msgCreateGroup = new MsgCreateGroup()
        .setAdmin(admin)
        .setMetadata(metadata);
      membersList.forEach(({ address, weight, metadata }) => {
        msgCreateGroup.addMembers(
          new MemberRequest()
            .setAddress(address)
            .setWeight(weight)
            .setMetadata(metadata)
        );
      });
      return msgCreateGroup;
    }

    case 'MsgSubmitGroupProposal': {
      const { messagesList, exec, groupPolicyAddress, metadata, proposersList } =
        params as MsgSubmitGroupProposalDisplay;
      const messagesListAny = messagesList.map((message) =>
        new google_protobuf_any_pb.Any()
          .setTypeUrl(message.typeUrl)
          .setValue(message.value)
      );
      const msgSubmitGroupProposal = new MsgSubmitGroupProposal()
        .setExec(exec)
        .setMetadata(metadata)
        .setGroupPolicyAddress(groupPolicyAddress)
        .setProposersList(proposersList)
        .setMessagesList(messagesListAny);

      return msgSubmitGroupProposal;
    }

    case 'MsgGroupVote': {
      const { proposalId, voter, option, exec, metadata } =
        params as MsgGroupVoteDisplay;
      const msgGroupVote = new MsgGroupVote()
        .setProposalId(proposalId)
        .setVoter(voter)
        .setOption(option)
        .setExec(exec)
        .setMetadata(metadata);
      return msgGroupVote;
    }

    case 'MsgExec': {
      const { proposalId, executor } = params as MsgExecDisplay;
      const msgExec = new MsgGroupExec()
        .setProposalId(proposalId)
        .setExecutor(executor);
      return msgExec;
    }

    case 'MsgInstantiateContract': {
      const { sender, admin, codeId, label, msg, fundsList } =
        params as MsgInstantiateContractDisplay;
      const msgInstantiateContract = new MsgInstantiateContract()
        .setSender(sender)
        .setAdmin(admin)
        .setCodeId(codeId)
        .setLabel(label)
        .setMsg(msg);
      fundsList.forEach(({ denom, amount }) => {
        msgInstantiateContract.addFunds(
          new Coin().setAmount(`${amount}`).setDenom(denom)
        );
      });
      return msgInstantiateContract;
    }

    case 'MsgInstantiateContract2': {
      const { sender, admin, codeId, label, msg, fundsList, salt, fixMsg } =
        params as MsgInstantiateContract2Display;
      const msgInstantiateContract = new MsgInstantiateContract2()
        .setSender(sender)
        .setAdmin(admin)
        .setCodeId(codeId)
        .setLabel(label)
        .setMsg(msg)
        .setSalt(salt)
        .setFixMsg(fixMsg);
      fundsList.forEach(({ denom, amount }) => {
        msgInstantiateContract.addFunds(
          new Coin().setAmount(`${amount}`).setDenom(denom)
        );
      });
      return msgInstantiateContract;
    }

    case 'MsgExecuteContract': {
      const { sender, contract, msg, fundsList } =
        params as MsgExecuteContractParams;
      const msgExecuteContract = new MsgExecuteContract()
        .setContract(contract)
        .setSender(sender)
        .setMsg(encoder.encode(JSON.stringify(msg)));
      if (fundsList)
        fundsList.forEach(({ denom, amount }) => {
          msgExecuteContract.addFunds(
            new Coin().setAmount(`${amount}`).setDenom(denom)
          );
        });
      return msgExecuteContract;
    }
    case 'MsgRegisterFido2Credential': {
      const { sender, userIdentifier, encodedattestation } =
          params as MsgRegisterFido2CredentialDisplay;
      const msgRegisterFido2Credential = new MsgRegisterFido2Credential()
          .setSender(sender)
          .setUserIdentifier(userIdentifier)
          .setEncodedattestation(encodedattestation);
      return msgRegisterFido2Credential;
    }

    case 'MsgRegisterCosmosCredential': {
      const { sender, pubkey } =
          params as MsgRegisterCosmosCredentialDisplay;
      const msgRegisterCosmosCredential = new MsgRegisterCosmosCredential()
      if (pubkey) {
        msgRegisterCosmosCredential.setPubkey(
            new google_protobuf_any_pb.Any()
                .setTypeUrl(pubkey.typeUrl)
                .setValue(pubkey.value)
        );
      } else {
        throw new Error("Pubkey is undefined");
      }
      return msgRegisterCosmosCredential;
    }

    case 'MsgMigrateToSmartAccountAuthentication': {
      const { sender } =
          params as MsgMigrateToSmartAccountAuthenticationDisplay;
      const msgMigrateToSmartAccountAuthentication =
          new MsgMigrateToSmartAccountAuthentication()
              .setSender(sender);
      return msgMigrateToSmartAccountAuthentication;
    }

    case 'MsgDeleteCredential': {
      const { sender, credentialNumber } = params as MsgDeleteCredentialDisplay;
      const msgDeleteCredential = new MsgDeleteCredential()
        .setSender(sender)
        .setCredentialNumber(credentialNumber);
          
      return msgDeleteCredential;
    }

    case 'MsgDeleteAccount': {
      const { sender, address } = params as MsgDeleteAccountDisplay;
      const msgDeleteAccount = new MsgDeleteAccount()
          .setSender(sender)
          .setAddress(address);
      return msgDeleteAccount;
    }

  }
};
