import { ReadableMessageNames } from 'types';
import { MsgExecuteContract } from '../../../../proto/cosmwasm/wasm/v1/tx_pb';

const decoder = new TextDecoder('utf-8');

/**
 * Formats MsgExecuteContract messages for display
 * @param message of type MsgExecuteContract
 * @returns object with MsgExecuteContract fields
 */
export const msgExecuteContract = (message: MsgExecuteContract) => ({
  typeName: 'MsgExecuteContractGeneric' as ReadableMessageNames,
  sender: (message as MsgExecuteContract).getSender(),
  msg: JSON.parse(
    decoder.decode((message as MsgExecuteContract).getMsg() as Uint8Array)
  ),
  fundsList: (message as MsgExecuteContract).getFundsList().map((coin) => ({
    denom: coin.getDenom(),
    amount: Number(coin.getAmount()),
  })),
});
