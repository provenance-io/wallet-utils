import { trimString } from './trimString';
import { hashFormat } from './hashFormat';
import { CoinAsObject, SupportedDenoms } from '../../types';
import { numberFormat } from './numberFormat';
import { capitalize } from './capitalize';
import { format } from 'date-fns';

/**
 * Known field keys from messages that are mapped to a formatting util function in {@link MSG_FIELD_TO_FORMAT_UTIL_MAP}
 */
export type MsgFieldKeys =
  | 'address'
  | 'administrator'
  | 'amount'
  | 'amountList'
  | 'feeAmount'
  | 'fromAddress'
  | 'gasPrice'
  | 'manager'
  | 'recipientAddress'
  | 'senderAddress'
  | 'signer'
  | 'status'
  | 'time'
  | 'toAddress'
  | 'type';

export type MessageObject = {
  [key in MsgFieldKeys]: any;
};
type GasPrice = {
  gasPrice: number;
  gasPriceDenom: string;
};
type AmountList = CoinAsObject[];

export const displayCapitalizedString = (fieldValue: any) => {
  return capitalize(`${fieldValue}`);
};

/**
 * Displays a wallet address by trimming length to 11.
 */
export const displayAddress = (fieldValue: string = '') => {
  return fieldValue ? trimString(fieldValue, 11, 3) : fieldValue;
};

/**
 * amountList is an array of objects: amountList: [{ denom: 'a', amount: '1' }, {...}]
 * Note: If the denom is nhash, autoconvert to hash
 */
export const displayAmountList = (fieldValue: AmountList) => {
  return fieldValue.map((coin) => displayCoinAsObject(coin));
};

/**
 * Hash is fixed to 5 dec points by default.
 */
export const displayHashFormat = (fieldValue: string, toFixed = 5) => {
  return `${hashFormat(fieldValue).toFixed(toFixed)} Hash`;
};
/**
 * Amount be a CoinAsObject or an amount. Automatically convert nhash to hash.
 * For other denoms, defaults to display a capital case of the denom.
 */
export const displayCoinAsObject = (fieldValue: string | number | CoinAsObject) => {
  if (typeof fieldValue === 'string' || typeof fieldValue === 'number')
    return numberFormat(fieldValue, 5);
  const { denom, amount } = fieldValue as CoinAsObject;
  switch (denom) {
    case 'hash':
      return `${amount} ${denom}`;
    case 'nhash':
      return `${hashFormat(amount)} Hash`;
    // TODO do we care about other SupportedDenoms displays?
    default:
      return `${amount} ${denom}`;
  }
};

export const displayGasPrice = (fieldValue: GasPrice) => {
  return displayCoinAsObject({
    denom: fieldValue.gasPriceDenom as SupportedDenoms,
    amount: fieldValue.gasPrice,
  });
};

export const displayDateAndTime = (fieldValue: string) => {
  return format(new Date(fieldValue), 'MMM d, h:mm:ss a');
};

/**
 * Object keyed by {@link MsgFieldKeys} with the formatting util
 * function as the value.
 */
export const defaultFieldKeyToDisplayFunctionMap: {
  [key in MsgFieldKeys]:
    | typeof displayAddress
    | typeof displayAmountList
    | typeof displayCapitalizedString
    | typeof displayDateAndTime
    | typeof displayCoinAsObject;
} = {
  address: displayAddress,
  manager: displayAddress,
  fromAddress: displayAddress,
  toAddress: displayAddress,
  senderAddress: displayAddress,
  recipientAddress: displayAddress,
  signer: displayAddress,
  administrator: displayAddress,
  amountList: displayAmountList,
  feeAmount: displayHashFormat,
  amount: displayCoinAsObject,
  gasPrice: displayGasPrice,
  type: displayCapitalizedString,
  status: displayCapitalizedString,
  time: displayDateAndTime,
};
