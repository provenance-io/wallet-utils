import { isMatching, P } from 'ts-pattern';
import { formatCustomObj, formatSingleValue } from '../../../utils';

const recurseFormatDisplayValue = (
  finalFlattenedDisplayObject: { [key: string]: any },
  currDisplayObject: { [key: string]: any },
  parentKey?: string
) => {
  Object.entries(currDisplayObject).forEach(([key, value]) => {
    const isStringOrNumberOrBool = ['string', 'number', 'boolean'].includes(
      typeof value
    );
    const isArrayOfObjects = isMatching(P.array({}), value);
    const isArrayOfStringsOrNumbersOrBools =
      isMatching(P.array(P.string), value) ||
      isMatching(P.array(P.string), value) ||
      isMatching(P.array(P.boolean), value);

    let currentFormattedValue: any;
    try {
      if (isStringOrNumberOrBool) {
        currentFormattedValue = formatSingleValue(value);
      } else {
        currentFormattedValue = formatCustomObj(key, value);
      }
    } catch (e) {
      console.error(e);
    }

    if (currentFormattedValue !== null) {
      parentKey
        ? (finalFlattenedDisplayObject[parentKey][key] = currentFormattedValue)
        : (finalFlattenedDisplayObject[key] = currentFormattedValue);
      return;
    }

    // Arrays are displayed as space delimited single values or recursed again.
    if (isArrayOfObjects || isArrayOfStringsOrNumbersOrBools) {
      // Array is all string/numbers (combine and display)
      if (isArrayOfStringsOrNumbersOrBools) {
        const currentFieldCombinedValue = value
          .map((v) => formatSingleValue(v))
          .join(`\n`);
        parentKey
          ? (finalFlattenedDisplayObject[parentKey][key] = currentFieldCombinedValue)
          : (finalFlattenedDisplayObject[key] = currentFieldCombinedValue);
        return;
      }
      // Array needs additional looping (object/array children)
      else {
        (value as any).forEach((cfArrayVal: any, index: number) => {
          const newCfName = value.length > 1 ? `${key} ${index + 1}` : key;
          finalFlattenedDisplayObject[newCfName] = {};
          recurseFormatDisplayValue(
            finalFlattenedDisplayObject,
            cfArrayVal,
            newCfName
          );
          return;
        });
      }
    }
    // Objects are also recursed again and passed a parent key.
    else {
      finalFlattenedDisplayObject[key] = {};
      recurseFormatDisplayValue(finalFlattenedDisplayObject, value, key);
      return;
    }
  });
};

/**
 * Formats a display object from {@link unpackDisplayObjectFromWalletMessage} by
 * recursing through the nested json object and formatting values based on
 * formatting functions {@link formatSingleValue} and {@link formatCustomObj}
 * that match keys and/or values to specific tests.
 * @param displayObject object being rendered
 */
export const formatDisplayObject = ({
  displayObject,
}: {
  displayObject: { [key: string]: any };
}) => {
  const finalMessage = {};
  if (displayObject) {
    Object.values(displayObject).reduce(
      () => recurseFormatDisplayValue(finalMessage, displayObject),
      {}
    );
  }

  return finalMessage;
};
