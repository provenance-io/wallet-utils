import { trimString } from './trimString';
import { hashFormat } from './hashFormat';
import { CoinAsObject } from '../../types';
import { numberFormat } from './numberFormat';
import { capitalize } from './capitalize';
import { format } from 'date-fns';
import { match, P } from 'ts-pattern';

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
    default:
      return `${amount} ${denom}`;
  }
};

export const displayGasPrice = (fieldValue: GasPrice) => {
  return displayCoinAsObject({
    denom: fieldValue.gasPriceDenom as string,
    amount: fieldValue.gasPrice,
  });
};

export const displayDateAndTime = (fieldValue: string) => {
  return format(new Date(fieldValue), 'MMM d, h:mm:ss a');
};

/**
 * Deduce the formatting function based on the field and/or value. Value
 * is formatted below, otherwise it may be an array/object which is
 * recursively unpacked message-service and passed through the formatting
 * function again.
 *
 */
export const formatSingleValue = (value: any) =>
  match({ value })
    // True => Yes, False => No
    .with({ value: P.boolean }, () => (value ? 'Yes' : 'No'))
    // Attempt to convert number or string to a Date
    .with(
      {
        value: P.when(() => new Date(value)).toString() === 'Invalid Date',
      },
      () => displayDateAndTime(value)
    )
    // Blockchain address usually starts with tp. Trim all other strings without spaces.
    .with(
      {
        value: P.when(
          (str: any) =>
            str.toString().indexOf('tp') === 0 ||
            (str.toString().indexOf(' ') < 0 && str.length > 30)
        ),
      },
      () => displayAddress(value)
    )
    // Values that are all caps separated by underscores, i.e. MARKER_TYPE_COIN
    .with(
      {
        value: P.when(() => new RegExp('^[A-Z]+(?:_[A-Z]+)*$').test(value)),
      },
      () => displayCapitalizedString(value)
    )
    // Default print as string
    .otherwise(() => value.toString());

/**
 * Deduce the formatting function based on the field and/or value. Value
 * is formatted below, otherwise it may be an array/object which is
 * recursively unpacked message-service and passed through the formatting
 * function again.
 */
export const formatCustomObj = (key: string, value: any) =>
  match({ key, value })
    .with(
      {
        value: P.array({ denom: P.string, amount: P.string || P.number }),
      },
      () => displayAmountList(value)
    )
    .with(
      {
        value: { denom: P.string, amount: P.string || P.number },
      },
      () => displayCoinAsObject(value)
    )
    .with(
      {
        value: {
          gasPriceDenom: P.string,
          gasPrice: P.string || P.number,
        },
      },
      () => displayGasPrice(value)
    )
    .with({ key: 'feeAmount' }, () => displayHashFormat(value))
    .with(
      {
        value: P.when((p: any) => new Date(p)).toString() === 'Invalid Date',
      },
      () => displayDateAndTime(value)
    )
    .otherwise(() => null);
