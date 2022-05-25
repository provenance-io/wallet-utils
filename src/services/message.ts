/**
 * Initial needs for wcjs
 *
 *
 * cancelRequest - MsgCancelRequest
 * delegateHash - MessageService
 * markerActivate - MsgActivateRequest
 * markerAdd - Access, AccessGrant, MarkerStatus, MarkerType, MsgAddMarkerRequest, Coin
 * markerFinalize - MsgFinalizeRequest
 * sendCoin - MessageService
 * sendHash - MessageService
 * sendHashBatch - MessageService
 */

import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { Message } from 'google-protobuf';
import { bytesToBase64 } from '@tendermint/belt';
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
  MsgSendDisplay,
  MsgSetWithdrawAddressDisplay,
  MsgSubmitEvidenceDisplay,
  MsgSubmitProposalDisplay,
  MsgUndelegateDisplay,
  MsgUnjailDisplay,
  MsgVerifyInvariantDisplay,
  MsgVoteDisplay,
  MsgVoteWeightedDisplay,
  MsgWithdrawDelegatorRewardDisplay,
  MsgWithdrawValidatorCommissionDisplay,
  ReadableMessageNames,
  TYPE_NAMES_READABLE_MAP,
} from '../types/message-types';
import { MsgDelegate } from '../proto/cosmos/staking/v1beta1/tx_pb';
import { Coin } from '../proto/cosmos/base/v1beta1/coin_pb';
import { MsgSend } from '../proto/cosmos/bank/v1beta1/tx_pb';

export const buildMessage = (
  type: ReadableMessageNames,
  params:
    | MsgSendDisplay
    | MsgExecuteContractParams
    | MsgGrantDisplay
    | MsgVerifyInvariantDisplay
    | MsgSetWithdrawAddressDisplay
    | MsgWithdrawDelegatorRewardDisplay
    | MsgWithdrawValidatorCommissionDisplay
    | MsgFundCommunityPoolDisplay
    | MsgSubmitEvidenceDisplay
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
      // log(`Building MsgSend: ${fromAddress} to ${toAddress}`);
      const msgSend = new MsgSend()
        .setFromAddress(fromAddress)
        .setToAddress(toAddress);
      amountList.forEach(({ denom, amount }) => {
        msgSend.addAmount(new Coin().setAmount(`${amount}`).setDenom(denom));
      });
      return msgSend;
    }
  }
};

export const createAnyMessageBase64 = (
  type: ReadableMessageNames,
  msg: Message
): string => {
  const msgAny = new google_protobuf_any_pb.Any();
  msgAny.pack(msg.serializeBinary(), TYPE_NAMES_READABLE_MAP[type], '/');
  return bytesToBase64(msgAny.serializeBinary());
};
