import { Coin } from '../../proto/cosmos/base/v1beta1/coin_pb';
import { CoinAsObject } from '../../types';

/**
 * This function accepts a list of fees of any denom and
 * returns a list of Coins
 * @param coinsList: List of coins
 * @returns List of coins of type Coin[].
 */
export const getCoinList = (coinsList: CoinAsObject[]) =>
  coinsList
    .reduce((agg: CoinAsObject[], curr: CoinAsObject) => {
      // Find if the same coin is already in the aggregated list
      const sameCoin = agg.find((i) => i.denom === curr.denom);
      if (sameCoin) {
        // if it is find the index of it
        const sameCoinInd = agg.findIndex((i) => i.denom === sameCoin.denom);
        // create a new array from the aggregate so we don't mutate it
        const result = [...agg];
        // change the item in place to add the current amount to whatever it currently is
        result[sameCoinInd] = {
          amount: +sameCoin.amount + +curr.amount,
          denom: curr.denom,
        };
        // return the resulting array
        return result;
      }

      // if the coin wasn't already in the aggregate just add it to the aggregate here
      return [...agg, curr];
    }, [])
    // sort by denom name in ascending order (assumes all denoms are lowercase)
    .sort((a, b) => (a.denom > b.denom ? 1 : -1))
    .map((feeItem) => {
      // map each feeItem and create a coin out of it
      const feeCoin = new Coin();
      feeCoin.setDenom(feeItem.denom);
      // since the amount can be a string or number we convert it to a string here
      feeCoin.setAmount(feeItem.amount.toString());
      return feeCoin;
    });
