import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import { Message } from 'google-protobuf';
import { base64ToBytes, bytesToBase64 } from '@tendermint/belt';
import { MsgSend } from '../../../proto/cosmos/bank/v1beta1/tx_pb';
import {
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from '../../../proto/cosmos/gov/v1/tx_pb';
import {
  MsgSubmitProposal as MsgSubmitGroupProposal,
  MsgVote as MsgGroupVote,
} from '../../../proto/cosmos/group/v1/tx_pb';
import {
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
} from '../../../proto/cosmwasm/wasm/v1/tx_pb';
import { MsgAddMarkerRequest } from '../../../proto/provenance/marker/v1/tx_pb';
import {
  CoinAsObject,
  MESSAGE_PROTOS,
  MsgSendDisplay,
  MsgSubmitProposalDisplay,
  MsgSubmitGroupProposalDisplay,
  ReadableMessageNames,
  SupportedMessageTypeNames,
} from '../../../types';
import {
  msgAddMarkerRequest,
  msgExecuteContract,
  msgGovVote,
  msgGroupVote,
  msgInstantiateContract,
  msgInstantiateContract2,
  msgSend,
  msgVoteWeighted,
} from './Components';
import { msgSubmitGovProposal } from './Components/msgSubmitGovProposal';
import { msgSubmitGroupProposal } from './Components/msgSubmitGroupProposal';

export type MsgExecuteContractDisplay = {
  sender: string;
  msg: any;
  fundsList: CoinAsObject[];
};

export type GenericDisplay = { [key: string]: any };

export type FallbackGenericMessageName = 'MsgGeneric' | 'MsgExecuteContractGeneric';

/**
 * Unpacks an anyMsgBase64 string to a formatted JSON object. The
 * display object templates are mapped to {@link SupportedMessageTypeNames}.
 * The display object returned contains a typeName field representing
 * the given SupportedMessageTypeNames type (i.e. cosmos.bank.v1beta1.MsgSend -> MsgSend).
 * @param anyMsgBase64 base64 string of supported message type
 * @returns a display formatted result of the provided message
 */
export const unpackDisplayObjectFromWalletMessage = (
  anyMsgBase64: string
): (
  | MsgSendDisplay
  | MsgExecuteContractDisplay
  | MsgSubmitProposalDisplay
  | MsgSubmitGroupProposalDisplay
  | GenericDisplay
) & {
  typeName: ReadableMessageNames | FallbackGenericMessageName;
} => {
  const msgBytes = base64ToBytes(anyMsgBase64);
  const msgAny = google_protobuf_any_pb.Any.deserializeBinary(msgBytes);
  const typeName = msgAny.getTypeName() as SupportedMessageTypeNames;
  if (MESSAGE_PROTOS[typeName]) {
    const message = msgAny.unpack(
      MESSAGE_PROTOS[typeName].deserializeBinary,
      typeName
    );
    switch (typeName) {
      case 'cosmos.bank.v1beta1.MsgSend':
        return msgSend(message as MsgSend);
      case 'cosmos.gov.v1.MsgVote':
        return msgGovVote(message as MsgVote);
      case 'cosmos.gov.v1.MsgVoteWeighted':
        return msgVoteWeighted(message as MsgVoteWeighted);
      case 'cosmwasm.wasm.v1.MsgInstantiateContract':
        return msgInstantiateContract(message as MsgInstantiateContract);
      case 'cosmwasm.wasm.v1.MsgInstantiateContract2':
        return msgInstantiateContract2(message as MsgInstantiateContract2);
      case 'cosmwasm.wasm.v1.MsgExecuteContract':
        return msgExecuteContract(message as MsgExecuteContract);
      case 'cosmos.group.v1.MsgSubmitProposal':
        return {
          // Return the regular fields from group proposal submissions
          ...msgSubmitGroupProposal(message as MsgSubmitGroupProposal),
          // Unpack and display messages recursively
          messagesList: (message as MsgSubmitGroupProposal)
            .getMessagesList()
            .map((msg) => {
              return unpackDisplayObjectFromWalletMessage(
                bytesToBase64(msg.serializeBinary())
              );
            }),
        };
      case 'cosmos.group.v1.MsgVote':
        return msgGroupVote(message as MsgGroupVote);
      case 'provenance.marker.v1.MsgAddMarkerRequest':
        return msgAddMarkerRequest(message as MsgAddMarkerRequest);
      case 'cosmos.gov.v1.MsgSubmitProposal':
        return msgSubmitGovProposal(message as MsgSubmitProposal);
      default:
        return {
          typeName: 'MsgGeneric',
          ...(message as Message).toObject(),
        };
    }
  }
  throw new Error(`Message type: ${typeName} is not supported for display.`);
};
