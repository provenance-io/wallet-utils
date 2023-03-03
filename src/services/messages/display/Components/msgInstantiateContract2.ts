import { ReadableMessageNames } from 'types';
import { MsgInstantiateContract2 } from '../../../../proto/cosmwasm/wasm/v1/tx_pb';

const decoder = new TextDecoder('utf-8');

/**
 * Formats MsgInstantiateContract2 messages for display
 * @param message of type MsgInstantiateContract2
 * @returns object with MsgInstantiateContract2 fields
 */
export const msgInstantiateContract2 = (message: MsgInstantiateContract2) => ({
  typeName: 'MsgInstantiateContract' as ReadableMessageNames,
  sender: message.getSender(),
  admin: message.getAdmin(),
  codeId: message.getCodeId(),
  label: message.getLabel(),
  msg: JSON.parse(decoder.decode(message.getMsg() as Uint8Array)),
  salt: JSON.parse(decoder.decode(message.getSalt() as Uint8Array)),
  fixMsg: message.getFixMsg(),
  fundsList: message.getFundsList().map((coin) => ({
    denom: coin.getDenom(),
    amount: Number(coin.getAmount()),
  })),
});
