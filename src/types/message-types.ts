import { MsgSend } from '../proto/cosmos/bank/v1beta1/tx_pb';
import { MsgVerifyInvariant } from '../proto/cosmos/crisis/v1beta1/tx_pb';
import { Message } from 'google-protobuf';
import { MarkerTransferAuthorization } from '../proto/provenance/marker/v1/authz_pb';
import {
  MsgBindNameRequest,
  MsgDeleteNameRequest,
} from '../proto/provenance/name/v1/tx_pb';
import {
  MsgAddAttributeRequest,
  MsgDeleteAttributeRequest,
  MsgDeleteDistinctAttributeRequest,
  MsgUpdateAttributeRequest,
} from '../proto/provenance/attribute/v1/tx_pb';
import {
  MsgActivateRequest,
  MsgAddAccessRequest,
  MsgAddMarkerRequest,
  MsgBurnRequest,
  MsgCancelRequest,
  MsgDeleteAccessRequest,
  MsgDeleteRequest,
  MsgFinalizeRequest,
  MsgMintRequest,
  MsgSetDenomMetadataRequest,
  MsgTransferRequest,
  MsgWithdrawRequest,
} from '../proto/provenance/marker/v1/tx_pb';
import {
  MsgCommitFundsRequest,
  MsgCreatePaymentRequest,
  MsgAcceptPaymentRequest,
  MsgRejectPaymentRequest,
  MsgRejectPaymentsRequest,
  MsgCancelPaymentsRequest,
  MsgCreateAskRequest,
  MsgCreateBidRequest,
  MsgCancelOrderRequest,
} from '../proto/provenance/exchange/v1/tx_pb';
import {
  MsgRegisterFido2Credential,
  MsgMigrateToSmartAccountAuthentication,
  MsgDeleteCredential,
  MsgDeleteAccount,
  MsgRegisterCosmosCredential,
  MsgUpdateParams
} from '../proto/provenance/smartaccounts/v1/tx_pb';
import {
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
} from '../proto/cosmos/distribution/v1beta1/tx_pb';
import {
  MsgVote,
  MsgVoteWeighted,
  MsgDeposit,
  MsgSubmitProposal,
  MsgExecLegacyContent,
} from '../proto/cosmos/gov/v1/tx_pb';
import { MsgUnjail } from '../proto/cosmos/slashing/v1beta1/tx_pb';
import {
  MsgEditValidator,
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgCreateValidator,
} from '../proto/cosmos/staking/v1beta1/tx_pb';
import {
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
  Plan,
} from '../proto/cosmos/upgrade/v1beta1/upgrade_pb';
import { MsgCreateVestingAccount } from '../proto/cosmos/vesting/v1beta1/tx_pb';
import { TextProposal } from '../proto/cosmos/gov/v1beta1/gov_pb';
import { Proposal } from '../proto/cosmos/gov/v1/gov_pb';
import { MsgGrant, MsgRevoke } from '../proto/cosmos/authz/v1beta1/tx_pb';
import {
  MsgCreateGroup,
  MsgUpdateGroupMembers,
  MsgUpdateGroupAdmin,
  MsgUpdateGroupMetadata,
  MsgCreateGroupPolicy,
  MsgUpdateGroupPolicyAdmin,
  MsgCreateGroupWithPolicy,
  MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyMetadata,
  MsgSubmitProposal as MsgSubmitGroupProposal,
  MsgWithdrawProposal,
  MsgVote as MsgGroupVote,
  MsgExec,
  MsgLeaveGroup,
} from '../proto/cosmos/group/v1/tx_pb';
import { Coin } from '../proto/cosmos/base/v1beta1/coin_pb';
import {
  StoreCodeProposal,
  InstantiateContractProposal,
} from '../proto/cosmwasm/wasm/v1/proposal_legacy_pb';
import { AccessConfig } from '../proto/cosmwasm/wasm/v1/types_pb';
import {
  ParamChange,
  ParameterChangeProposal,
} from '../proto/cosmos/params/v1beta1/params_pb';
import {
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
} from '../proto/cosmwasm/wasm/v1/tx_pb';
import { PubKey } from '../proto/cosmos/crypto/secp256k1/keys_pb';

import { ExecuteMsg } from './schema/ats-smart-contract/execute_msg';
import { ExecuteMsg as DigitalCurrencyConsortiumExecuteMsg } from './schema/digital-currency-consortium/execute_msg';

export type SupportedMessageTypeNames =
  | 'cosmos.authz.v1beta1.MsgGrant'
  | 'cosmos.authz.v1beta1.MsgRevoke'
  | 'cosmos.bank.v1beta1.MsgSend'
  | 'cosmos.crisis.v1beta1.MsgVerifyInvariant'
  | 'cosmos.crypto.secp256k1.PubKey'
  | 'cosmos.distribution.v1beta1.MsgFundCommunityPool'
  | 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress'
  | 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
  | 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission'
  | 'cosmos.group.v1.MsgCreateGroup'
  | 'cosmos.group.v1.MsgUpdateGroupMembers'
  | 'cosmos.group.v1.MsgUpdateGroupAdmin'
  | 'cosmos.group.v1.MsgUpdateGroupMetadata'
  | 'cosmos.group.v1.MsgCreateGroupPolicy'
  | 'cosmos.group.v1.MsgUpdateGroupPolicyAdmin'
  | 'cosmos.group.v1.MsgCreateGroupWithPolicy'
  | 'cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy'
  | 'cosmos.group.v1.MsgUpdateGroupPolicyMetadata'
  | 'cosmos.group.v1.MsgSubmitProposal'
  | 'cosmos.group.v1.MsgWithdrawProposal'
  | 'cosmos.group.v1.MsgVote'
  | 'cosmos.group.v1.MsgExec'
  | 'cosmos.group.v1.MsgLeaveGroup'
  | 'cosmos.gov.v1.MsgDeposit'
  | 'cosmos.gov.v1.MsgExecLegacyContent'
  | 'cosmos.gov.v1.MsgSubmitProposal'
  | 'cosmos.gov.v1.MsgVote'
  | 'cosmos.gov.v1.MsgVoteWeighted'
  | 'cosmos.gov.v1.Proposal'
  | 'cosmos.gov.v1beta1.TextProposal'
  | 'cosmos.params.v1beta1.ParamChange'
  | 'cosmos.params.v1beta1.ParameterChangeProposal'
  | 'cosmos.slashing.v1beta1.MsgUnjail'
  | 'cosmos.staking.v1beta1.MsgBeginRedelegate'
  | 'cosmos.staking.v1beta1.MsgCreateValidator'
  | 'cosmos.staking.v1beta1.MsgDelegate'
  | 'cosmos.staking.v1beta1.MsgEditValidator'
  | 'cosmos.staking.v1beta1.MsgUndelegate'
  | 'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal'
  | 'cosmos.upgrade.v1beta1.Plan'
  | 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal'
  | 'cosmos.vesting.v1beta1.MsgCreateVestingAccount'
  | 'cosmwasm.wasm.v1.AccessConfig'
  | 'cosmwasm.wasm.v1.InstantiateCodeProposal'
  | 'cosmwasm.wasm.v1.MsgExecuteContract'
  | 'cosmwasm.wasm.v1.MsgInstantiateContract'
  | 'cosmwasm.wasm.v1.MsgInstantiateContract2'
  | 'cosmwasm.wasm.v1.StoreCodeProposal'
  | 'provenance.attribute.v1.MsgAddAttributeRequest'
  | 'provenance.attribute.v1.MsgDeleteAttributeRequest'
  | 'provenance.attribute.v1.MsgDeleteDistinctAttributeRequest'
  | 'provenance.attribute.v1.MsgUpdateAttributeRequest'
  | 'provenance.marker.v1.MarkerTransferAuthorization'
  | 'provenance.marker.v1.MsgActivateRequest'
  | 'provenance.marker.v1.MsgAddAccessRequest'
  | 'provenance.marker.v1.MsgAddMarkerRequest'
  | 'provenance.marker.v1.MsgBurnRequest'
  | 'provenance.marker.v1.MsgCancelRequest'
  | 'provenance.marker.v1.MsgDeleteAccessRequest'
  | 'provenance.marker.v1.MsgDeleteRequest'
  | 'provenance.marker.v1.MsgFinalizeRequest'
  | 'provenance.marker.v1.MsgMintRequest'
  | 'provenance.marker.v1.MsgSetDenomMetadataRequest'
  | 'provenance.marker.v1.MsgTransferRequest'
  | 'provenance.marker.v1.MsgWithdrawRequest'
  | 'provenance.name.v1.MsgBindNameRequest'
  | 'provenance.name.v1.MsgDeleteNameRequest'
  // Provenance Exchange
  | 'provenance.exchange.v1.MsgCommitFundsRequest'
  | 'provenance.exchange.v1.MsgCreatePaymentRequest'
  | 'provenance.exchange.v1.MsgAcceptPaymentRequest'
  | 'provenance.exchange.v1.MsgRejectPaymentRequest'
  | 'provenance.exchange.v1.MsgRejectPaymentsRequest'
  | 'provenance.exchange.v1.MsgCancelPaymentsRequest'
  | 'provenance.exchange.v1.MsgCreateAskRequest'
  | 'provenance.exchange.v1.MsgCreateBidRequest'
  | 'provenance.exchange.v1.MsgCancelOrderRequest'
  | 'provenance.smartaccounts.v1.MsgUpdateParams'
  | 'provenance.smartaccounts.v1.MsgRegisterFido2Credential'
  | 'provenance.smartaccounts.v1.MsgRegisterCosmosCredential'
  | 'provenance.smartaccounts.v1.MsgMigrateToSmartAccountAuthentication'
  | 'provenance.smartaccounts.v1.MsgDeleteCredential'
  | 'provenance.smartaccounts.v1.MsgDeleteAccount';

export type ReadableMessageNames =
  | 'MsgGrant'
  | 'MsgRevoke'
  | 'MsgSend'
  | 'MsgVerifyInvariant'
  | 'PubKey'
  | 'MsgFundCommunityPool'
  | 'MsgSetWithdrawAddress'
  | 'MsgWithdrawDelegatorReward'
  | 'MsgWithdrawValidatorCommission'
  | 'MsgCreateGroup'
  | 'MsgUpdateGroupMembers'
  | 'MsgUpdateGroupAdmin'
  | 'MsgUpdateGroupMetadata'
  | 'MsgCreateGroupPolicy'
  | 'MsgUpdateGroupPolicyAdmin'
  | 'MsgCreateGroupWithPolicy'
  | 'MsgUpdateGroupPolicyDecisionPolicy'
  | 'MsgUpdateGroupPolicyMetadata'
  | 'MsgSubmitGroupProposal'
  | 'MsgWithdrawProposal'
  | 'MsgGroupVote'
  | 'MsgExec'
  | 'MsgLeaveGroup'
  | 'MsgDeposit'
  | 'MsgExecLegacyContent'
  | 'MsgSubmitProposal'
  | 'TextProposal'
  | 'SoftwareUpgradeProposal'
  | 'CancelSoftwareUpgradeProposal'
  | 'Plan'
  | 'StoreCodeProposal'
  | 'InstantiateCodeProposal'
  | 'AccessConfig'
  | 'ParameterChangeProposal'
  | 'ParamChange'
  | 'MsgVote'
  | 'MsgVoteWeighted'
  | 'Proposal'
  | 'MsgUnjail'
  | 'MsgBeginRedelegate'
  | 'MsgCreateValidator'
  | 'MsgDelegate'
  | 'MsgEditValidator'
  | 'MsgUndelegate'
  | 'MsgCreateVestingAccount'
  | 'MsgExecuteContract'
  | 'MsgInstantiateContract'
  | 'MsgInstantiateContract2'
  | 'MsgAddAttributeRequest'
  | 'MsgDeleteAttributeRequest'
  | 'MsgDeleteDistinctAttributeRequest'
  | 'MsgUpdateAttributeRequest'
  | 'MarkerTransferAuthorization'
  | 'MsgActivateRequest'
  | 'MsgAddAccessRequest'
  | 'MsgAddMarkerRequest'
  | 'MsgBurnRequest'
  | 'MsgCancelRequest'
  | 'MsgDeleteAccessRequest'
  | 'MsgDeleteRequest'
  | 'MsgFinalizeRequest'
  | 'MsgMintRequest'
  | 'MsgSetDenomMetadataRequest'
  | 'MsgTransferRequest'
  | 'MsgWithdrawRequest'
  | 'MsgBindNameRequest'
  | 'MsgDeleteNameRequest'
  // Provenance Exchange
  | 'MsgCommitFundsRequest'
  | 'MsgCreatePaymentRequest'
  | 'MsgAcceptPaymentRequest'
  | 'MsgRejectPaymentRequest'
  | 'MsgRejectPaymentsRequest'
  | 'MsgCancelPaymentsRequest'
  | 'MsgCreateAskRequest'
  | 'MsgCreateBidRequest'
  | 'MsgCancelOrderRequest'
  | 'MsgUpdateParams'
  | 'MsgRegisterFido2Credential'
  | 'MsgRegisterCosmosCredential'
  | 'MsgMigrateToSmartAccountAuthentication'
  | 'MsgDeleteCredential'
  | 'MsgDeleteAccount';

export const TYPE_NAMES_READABLE_MAP: {
  [key in ReadableMessageNames]: SupportedMessageTypeNames;
} = {
  MsgGrant: 'cosmos.authz.v1beta1.MsgGrant',
  MsgRevoke: 'cosmos.authz.v1beta1.MsgRevoke',
  MsgSend: 'cosmos.bank.v1beta1.MsgSend',
  MsgVerifyInvariant: 'cosmos.crisis.v1beta1.MsgVerifyInvariant',
  PubKey: 'cosmos.crypto.secp256k1.PubKey',
  MsgFundCommunityPool: 'cosmos.distribution.v1beta1.MsgFundCommunityPool',
  MsgSetWithdrawAddress: 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  MsgWithdrawDelegatorReward:
    'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  MsgWithdrawValidatorCommission:
    'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
  MsgCreateGroup: 'cosmos.group.v1.MsgCreateGroup',
  MsgUpdateGroupMembers: 'cosmos.group.v1.MsgUpdateGroupMembers',
  MsgUpdateGroupAdmin: 'cosmos.group.v1.MsgUpdateGroupAdmin',
  MsgUpdateGroupMetadata: 'cosmos.group.v1.MsgUpdateGroupMetadata',
  MsgCreateGroupPolicy: 'cosmos.group.v1.MsgCreateGroupPolicy',
  MsgUpdateGroupPolicyAdmin: 'cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
  MsgCreateGroupWithPolicy: 'cosmos.group.v1.MsgCreateGroupWithPolicy',
  MsgUpdateGroupPolicyDecisionPolicy:
    'cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
  MsgUpdateGroupPolicyMetadata: 'cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
  MsgSubmitGroupProposal: 'cosmos.group.v1.MsgSubmitProposal',
  MsgWithdrawProposal: 'cosmos.group.v1.MsgWithdrawProposal',
  MsgGroupVote: 'cosmos.group.v1.MsgVote',
  MsgExec: 'cosmos.group.v1.MsgExec',
  MsgLeaveGroup: 'cosmos.group.v1.MsgLeaveGroup',
  MsgDeposit: 'cosmos.gov.v1.MsgDeposit',
  MsgExecLegacyContent: 'cosmos.gov.v1.MsgExecLegacyContent',
  MsgSubmitProposal: 'cosmos.gov.v1.MsgSubmitProposal',
  TextProposal: 'cosmos.gov.v1beta1.TextProposal',
  SoftwareUpgradeProposal: 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
  CancelSoftwareUpgradeProposal:
    'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
  Plan: 'cosmos.upgrade.v1beta1.Plan',
  StoreCodeProposal: 'cosmwasm.wasm.v1.StoreCodeProposal',
  InstantiateCodeProposal: 'cosmwasm.wasm.v1.InstantiateCodeProposal',
  AccessConfig: 'cosmwasm.wasm.v1.AccessConfig',
  ParameterChangeProposal: 'cosmos.params.v1beta1.ParameterChangeProposal',
  ParamChange: 'cosmos.params.v1beta1.ParamChange',
  MsgVote: 'cosmos.gov.v1.MsgVote',
  MsgVoteWeighted: 'cosmos.gov.v1.MsgVoteWeighted',
  Proposal: 'cosmos.gov.v1.Proposal',
  MsgUnjail: 'cosmos.slashing.v1beta1.MsgUnjail',
  MsgBeginRedelegate: 'cosmos.staking.v1beta1.MsgBeginRedelegate',
  MsgCreateValidator: 'cosmos.staking.v1beta1.MsgCreateValidator',
  MsgDelegate: 'cosmos.staking.v1beta1.MsgDelegate',
  MsgEditValidator: 'cosmos.staking.v1beta1.MsgEditValidator',
  MsgUndelegate: 'cosmos.staking.v1beta1.MsgUndelegate',
  MsgCreateVestingAccount: 'cosmos.vesting.v1beta1.MsgCreateVestingAccount',
  MsgExecuteContract: 'cosmwasm.wasm.v1.MsgExecuteContract',
  MsgInstantiateContract: 'cosmwasm.wasm.v1.MsgInstantiateContract',
  MsgInstantiateContract2: 'cosmwasm.wasm.v1.MsgInstantiateContract2',
  MsgAddAttributeRequest: 'provenance.attribute.v1.MsgAddAttributeRequest',
  MsgDeleteAttributeRequest: 'provenance.attribute.v1.MsgDeleteAttributeRequest',
  MsgDeleteDistinctAttributeRequest:
    'provenance.attribute.v1.MsgDeleteDistinctAttributeRequest',
  MsgUpdateAttributeRequest: 'provenance.attribute.v1.MsgUpdateAttributeRequest',
  MarkerTransferAuthorization: 'provenance.marker.v1.MarkerTransferAuthorization',
  MsgActivateRequest: 'provenance.marker.v1.MsgActivateRequest',
  MsgAddAccessRequest: 'provenance.marker.v1.MsgAddAccessRequest',
  MsgAddMarkerRequest: 'provenance.marker.v1.MsgAddMarkerRequest',
  MsgBurnRequest: 'provenance.marker.v1.MsgBurnRequest',
  MsgCancelRequest: 'provenance.marker.v1.MsgCancelRequest',
  MsgDeleteAccessRequest: 'provenance.marker.v1.MsgDeleteAccessRequest',
  MsgDeleteRequest: 'provenance.marker.v1.MsgDeleteRequest',
  MsgFinalizeRequest: 'provenance.marker.v1.MsgFinalizeRequest',
  MsgMintRequest: 'provenance.marker.v1.MsgMintRequest',
  MsgSetDenomMetadataRequest: 'provenance.marker.v1.MsgSetDenomMetadataRequest',
  MsgTransferRequest: 'provenance.marker.v1.MsgTransferRequest',
  MsgWithdrawRequest: 'provenance.marker.v1.MsgWithdrawRequest',
  MsgBindNameRequest: 'provenance.name.v1.MsgBindNameRequest',
  MsgDeleteNameRequest: 'provenance.name.v1.MsgDeleteNameRequest',
  // Provenance Exchange
  MsgCommitFundsRequest: 'provenance.exchange.v1.MsgCommitFundsRequest',
  MsgCreatePaymentRequest: 'provenance.exchange.v1.MsgCreatePaymentRequest',
  MsgAcceptPaymentRequest: 'provenance.exchange.v1.MsgAcceptPaymentRequest',
  MsgRejectPaymentRequest: 'provenance.exchange.v1.MsgRejectPaymentRequest',
  MsgRejectPaymentsRequest: 'provenance.exchange.v1.MsgRejectPaymentsRequest',
  MsgCancelPaymentsRequest: 'provenance.exchange.v1.MsgCancelPaymentsRequest',
  MsgCreateAskRequest: 'provenance.exchange.v1.MsgCreateAskRequest',
  MsgCreateBidRequest: 'provenance.exchange.v1.MsgCreateBidRequest',
  MsgCancelOrderRequest: 'provenance.exchange.v1.MsgCancelOrderRequest',
  MsgUpdateParams: 'provenance.smartaccounts.v1.MsgUpdateParams',
  MsgRegisterFido2Credential: 'provenance.smartaccounts.v1.MsgRegisterFido2Credential',
  MsgRegisterCosmosCredential: 'provenance.smartaccounts.v1.MsgRegisterCosmosCredential',
  MsgMigrateToSmartAccountAuthentication: 'provenance.smartaccounts.v1.MsgMigrateToSmartAccountAuthentication',
  MsgDeleteCredential: 'provenance.smartaccounts.v1.MsgDeleteCredential',
  MsgDeleteAccount: 'provenance.smartaccounts.v1.MsgDeleteAccount',
};

export type MsgUpdateParamsDisplay = MsgUpdateParams.AsObject;
export type MsgRegisterFido2CredentialDisplay = MsgRegisterFido2Credential.AsObject;
export type MsgRegisterCosmosCredentialDisplay = MsgRegisterCosmosCredential.AsObject;
export type MsgMigrateToSmartAccountAuthenticationDisplay = MsgMigrateToSmartAccountAuthentication.AsObject;
export type MsgDeleteCredentialDisplay = MsgDeleteCredential.AsObject;
export type MsgDeleteAccountDisplay = MsgDeleteAccount.AsObject;

// Provenance Exchange
export type MsgCommitFundsRequestDisplay = MsgCommitFundsRequest.AsObject;
export type MsgCreatePaymentRequestDisplay = MsgCreatePaymentRequest.AsObject;
export type MsgAcceptPaymentRequestDisplay = MsgAcceptPaymentRequest.AsObject;
export type MsgRejectPaymentRequestDisplay = MsgRejectPaymentRequest.AsObject;
export type MsgRejectPaymentsRequestDisplay = MsgRejectPaymentsRequest.AsObject;
export type MsgCancelPaymentsRequestDisplay = MsgCancelPaymentsRequest.AsObject;
export type MsgCreateAskRequestDisplay = MsgCreateAskRequest.AsObject;
export type MsgCreateBidRequestDisplay = MsgCreateBidRequest.AsObject;
export type MsgCancelOrderRequestDisplay = MsgCancelOrderRequest.AsObject;

export type MsgSendDisplay = MsgSend.AsObject;
export type MsgVerifyInvariantDisplay = MsgVerifyInvariant.AsObject;
export type MsgSetWithdrawAddressDisplay = MsgSetWithdrawAddress.AsObject;
export type MsgWithdrawDelegatorRewardDisplay = MsgWithdrawDelegatorReward.AsObject;
export type MsgWithdrawValidatorCommissionDisplay =
  MsgWithdrawValidatorCommission.AsObject;
export type MsgFundCommunityPoolDisplay = MsgFundCommunityPool.AsObject;
export type MsgExecLegacyContentDisplay = MsgExecLegacyContent.AsObject;
export type TextProposalDisplay = TextProposal.AsObject;
export type SoftwareUpgradeProposalDisplay = SoftwareUpgradeProposal.AsObject;
export type CancelSoftwareUpgradeProposalDisplay =
  CancelSoftwareUpgradeProposal.AsObject;
export type PlanDisplay = Plan.AsObject;
export type StoreCodeProposalDisplay = StoreCodeProposal.AsObject;
export type InstantiateContractProposalDisplay =
  InstantiateContractProposal.AsObject;
export type AccessConfigDisplay = AccessConfig.AsObject;
export type ParameterChangeProposalDisplay = ParameterChangeProposal.AsObject;
export type ProposalDisplay = Proposal.AsObject;
export type MsgVoteDisplay = MsgVote.AsObject;
export type MsgVoteWeightedDisplay = MsgVoteWeighted.AsObject;
export type MsgDepositDisplay = MsgDeposit.AsObject;
export type MsgUnjailDisplay = MsgUnjail.AsObject;
export type MsgEditValidatorDisplay = MsgEditValidator.AsObject;
export type MsgDelegateDisplay = MsgDelegate.AsObject;
export type MsgBeginRedelegateDisplay = MsgBeginRedelegate.AsObject;
export type MsgUndelegateDisplay = MsgUndelegate.AsObject;
export type MsgCreateVestingAccountDisplay = MsgCreateVestingAccount.AsObject;
export type MsgGrantDisplay = MsgGrant.AsObject & { transferLimit: Coin.AsObject };
export type MsgRevokeDisplay = MsgRevoke.AsObject;
export type MsgSubmitProposalDisplay = MsgSubmitProposal.AsObject;
export type MsgCreateGroupDisplay = MsgCreateGroup.AsObject;
export type MsgUpdateGroupMembersDisplay = MsgUpdateGroupMembers.AsObject;
export type MsgUpdateGroupAdminDisplay = MsgUpdateGroupAdmin.AsObject;
export type MsgUpdateGroupMetadataDisplay = MsgUpdateGroupMetadata.AsObject;
export type MsgCreateGroupPolicyDisplay = MsgCreateGroupPolicy.AsObject;
export type MsgUpdateGroupPolicyAdminDisplay = MsgUpdateGroupPolicyAdmin.AsObject;
export type MsgCreateGroupWithPolicyDisplay = MsgCreateGroupWithPolicy.AsObject;
export type MsgUpdateGroupPolicyDecisionPolicyDisplay =
  MsgUpdateGroupPolicyDecisionPolicy.AsObject;
export type MsgUpdateGroupPolicyMetadataDisplay =
  MsgUpdateGroupPolicyMetadata.AsObject;
export type MsgSubmitGroupProposalDisplay = MsgSubmitGroupProposal.AsObject;
export type MsgWithdrawProposalDisplay = MsgWithdrawProposal.AsObject;
export type MsgGroupVoteDisplay = MsgGroupVote.AsObject;
export type MsgExecDisplay = MsgExec.AsObject;
export type MsgLeaveGroupDisplay = MsgLeaveGroup.AsObject;
export type MsgInstantiateContractDisplay = MsgInstantiateContract.AsObject;
export type MsgInstantiateContract2Display = MsgInstantiateContract2.AsObject;

export type AtsMessage = {
  contractType: 'ats';
  msg: ExecuteMsg;
};

type UnknownContract = {
  msg: any;
};

export type MsgExecuteContractParams =
  | (Omit<MsgExecuteContract.AsObject, 'msg'> & UnknownContract)
  | (Omit<MsgExecuteContract.AsObject, 'msg'> & AtsMessage)
  | (Omit<MsgExecuteContract.AsObject, 'msg'> & {
    msg: DigitalCurrencyConsortiumExecuteMsg;
  });

export type MsgCreateValidatorDisplay = Omit<
  MsgCreateValidator.AsObject,
  'pubkey'
> & {
  pubkey: PubKey.AsObject;
};

export const MESSAGE_PROTOS: { [key in SupportedMessageTypeNames]: typeof Message } =
{
  'cosmos.authz.v1beta1.MsgGrant': MsgGrant,
  'cosmos.authz.v1beta1.MsgRevoke': MsgRevoke,
  'cosmos.bank.v1beta1.MsgSend': MsgSend,
  'cosmos.crisis.v1beta1.MsgVerifyInvariant': MsgVerifyInvariant,
  'cosmos.crypto.secp256k1.PubKey': PubKey,
  'cosmos.distribution.v1beta1.MsgFundCommunityPool': MsgFundCommunityPool,
  'cosmos.distribution.v1beta1.MsgSetWithdrawAddress': MsgSetWithdrawAddress,
  'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
    MsgWithdrawDelegatorReward,
  'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
    MsgWithdrawValidatorCommission,
  'cosmos.group.v1.MsgCreateGroup': MsgCreateGroup,
  'cosmos.group.v1.MsgUpdateGroupMembers': MsgUpdateGroupMembers,
  'cosmos.group.v1.MsgUpdateGroupAdmin': MsgUpdateGroupAdmin,
  'cosmos.group.v1.MsgUpdateGroupMetadata': MsgUpdateGroupMetadata,
  'cosmos.group.v1.MsgCreateGroupPolicy': MsgCreateGroupPolicy,
  'cosmos.group.v1.MsgUpdateGroupPolicyAdmin': MsgUpdateGroupPolicyAdmin,
  'cosmos.group.v1.MsgCreateGroupWithPolicy': MsgCreateGroupWithPolicy,
  'cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy':
    MsgUpdateGroupPolicyDecisionPolicy,
  'cosmos.group.v1.MsgUpdateGroupPolicyMetadata': MsgUpdateGroupPolicyMetadata,
  'cosmos.group.v1.MsgSubmitProposal': MsgSubmitGroupProposal,
  'cosmos.group.v1.MsgWithdrawProposal': MsgWithdrawProposal,
  'cosmos.group.v1.MsgVote': MsgGroupVote,
  'cosmos.group.v1.MsgExec': MsgExec,
  'cosmos.group.v1.MsgLeaveGroup': MsgLeaveGroup,
  'cosmos.gov.v1.MsgDeposit': MsgDeposit,
  'cosmos.gov.v1.MsgExecLegacyContent': MsgExecLegacyContent,
  'cosmos.gov.v1.MsgSubmitProposal': MsgSubmitProposal,
  'cosmos.gov.v1.MsgVote': MsgVote,
  'cosmos.gov.v1.Proposal': Proposal,
  'cosmos.gov.v1beta1.TextProposal': TextProposal,
  'cosmos.params.v1beta1.ParamChange': ParamChange,
  'cosmos.params.v1beta1.ParameterChangeProposal': ParameterChangeProposal,
  'cosmos.slashing.v1beta1.MsgUnjail': MsgUnjail,
  'cosmos.staking.v1beta1.MsgBeginRedelegate': MsgBeginRedelegate,
  'cosmos.staking.v1beta1.MsgCreateValidator': MsgCreateValidator,
  'cosmos.staking.v1beta1.MsgDelegate': MsgDelegate,
  'cosmos.staking.v1beta1.MsgEditValidator': MsgEditValidator,
  'cosmos.staking.v1beta1.MsgUndelegate': MsgUndelegate,
  'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
    CancelSoftwareUpgradeProposal,
  'cosmos.upgrade.v1beta1.Plan': Plan,
  'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal': SoftwareUpgradeProposal,
  'cosmos.vesting.v1beta1.MsgCreateVestingAccount': MsgCreateVestingAccount,
  'cosmwasm.wasm.v1.AccessConfig': AccessConfig,
  'cosmwasm.wasm.v1.InstantiateCodeProposal': InstantiateContractProposal,
  'cosmwasm.wasm.v1.MsgExecuteContract': MsgExecuteContract,
  'cosmwasm.wasm.v1.MsgInstantiateContract': MsgInstantiateContract,
  'cosmwasm.wasm.v1.MsgInstantiateContract2': MsgInstantiateContract2,
  'cosmwasm.wasm.v1.StoreCodeProposal': StoreCodeProposal,
  'cosmos.gov.v1.MsgVoteWeighted': MsgVoteWeighted,
  'provenance.attribute.v1.MsgAddAttributeRequest': MsgAddAttributeRequest,
  'provenance.attribute.v1.MsgDeleteAttributeRequest': MsgDeleteAttributeRequest,
  'provenance.attribute.v1.MsgDeleteDistinctAttributeRequest':
    MsgDeleteDistinctAttributeRequest,
  'provenance.attribute.v1.MsgUpdateAttributeRequest': MsgUpdateAttributeRequest,
  'provenance.marker.v1.MarkerTransferAuthorization': MarkerTransferAuthorization,
  'provenance.marker.v1.MsgActivateRequest': MsgActivateRequest,
  'provenance.marker.v1.MsgAddAccessRequest': MsgAddAccessRequest,
  'provenance.marker.v1.MsgAddMarkerRequest': MsgAddMarkerRequest,
  'provenance.marker.v1.MsgBurnRequest': MsgBurnRequest,
  'provenance.marker.v1.MsgCancelRequest': MsgCancelRequest,
  'provenance.marker.v1.MsgDeleteAccessRequest': MsgDeleteAccessRequest,
  'provenance.marker.v1.MsgDeleteRequest': MsgDeleteRequest,
  'provenance.marker.v1.MsgFinalizeRequest': MsgFinalizeRequest,
  'provenance.marker.v1.MsgMintRequest': MsgMintRequest,
  'provenance.marker.v1.MsgSetDenomMetadataRequest': MsgSetDenomMetadataRequest,
  'provenance.marker.v1.MsgTransferRequest': MsgTransferRequest,
  'provenance.marker.v1.MsgWithdrawRequest': MsgWithdrawRequest,
  'provenance.name.v1.MsgBindNameRequest': MsgBindNameRequest,
  'provenance.name.v1.MsgDeleteNameRequest': MsgDeleteNameRequest,
  // Provenance Exchange
  'provenance.exchange.v1.MsgCommitFundsRequest': MsgCommitFundsRequest,
  'provenance.exchange.v1.MsgCreatePaymentRequest': MsgCreatePaymentRequest,
  'provenance.exchange.v1.MsgAcceptPaymentRequest': MsgAcceptPaymentRequest,
  'provenance.exchange.v1.MsgRejectPaymentRequest': MsgRejectPaymentRequest,
  'provenance.exchange.v1.MsgRejectPaymentsRequest': MsgRejectPaymentsRequest,
  'provenance.exchange.v1.MsgCancelPaymentsRequest': MsgCancelPaymentsRequest,
  'provenance.exchange.v1.MsgCreateAskRequest': MsgCreateAskRequest,
  'provenance.exchange.v1.MsgCreateBidRequest': MsgCreateBidRequest,
  'provenance.exchange.v1.MsgCancelOrderRequest': MsgCancelOrderRequest,
  'provenance.smartaccounts.v1.MsgUpdateParams': MsgUpdateParams,
  'provenance.smartaccounts.v1.MsgRegisterFido2Credential': MsgRegisterFido2Credential,
  'provenance.smartaccounts.v1.MsgRegisterCosmosCredential': MsgRegisterCosmosCredential,
  'provenance.smartaccounts.v1.MsgMigrateToSmartAccountAuthentication': MsgMigrateToSmartAccountAuthentication,
  'provenance.smartaccounts.v1.MsgDeleteCredential': MsgDeleteCredential,
  'provenance.smartaccounts.v1.MsgDeleteAccount': MsgDeleteAccount,
};
