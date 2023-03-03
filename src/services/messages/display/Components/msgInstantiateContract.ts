import { ReadableMessageNames } from 'types';
import { MsgInstantiateContract } from '../../../../proto/cosmwasm/wasm/v1/tx_pb';

const decoder = new TextDecoder('utf-8');

/**
 * Formats MsgInstantiateContract messages for display
 * @param message of type MsgInstantiateContract
 * @returns object with MsgInstantiateContract fields
 */
export const msgInstantiateContract = (message: MsgInstantiateContract) => ({
  typeName: 'MsgInstantiateContract' as ReadableMessageNames,
  sender: message.getSender(),
  admin: message.getAdmin(),
  codeId: message.getCodeId(),
  label: message.getLabel(),
  msg: JSON.parse(decoder.decode(message.getMsg() as Uint8Array)),
  fundsList: message.getFundsList().map((coin) => ({
    denom: coin.getDenom(),
    amount: Number(coin.getAmount()),
  })),
});
