import * as accounting from 'accounting';

export interface IDividendMax {
  readonly name: string;
  readonly ticker: string;
  readonly flag: string;
  readonly mic: string;
  readonly price: string;
  readonly amnt: string;
  readonly xdd: string;
  readonly path: string;
  readonly prev: string;
  readonly icon: string;
  readonly ind: string;
}

export interface IDividend {
  readonly id: number;
  readonly name: string;
  readonly ticker: string;
  readonly flag: string;
  readonly market: string;
  readonly price: number;
  readonly ccy: string;
  readonly nextAmount: number;
  readonly previousAmount: number;
  readonly exDividendDate: number,
  readonly dividendYield: number;
  readonly path: string;
}

export const map = (dvd: IDividendMax, id: number): IDividend => {
  const ccy = dvd.price.startsWith('£') ? 'GBP' : 'USD';
  const price = accounting.unformat(dvd.price);
  const nextAmount = accounting.unformat(dvd.amnt) / 100;
  const previousAmount = accounting.unformat(dvd.prev) / 100;

  const dividendYield = (nextAmount + previousAmount) / price;

  return {
    id,
    name: dvd.name,
    ticker: dvd.ticker,
    flag: dvd.flag,
    market: dvd.mic,
    price,
    ccy,
    nextAmount,
    previousAmount,
    exDividendDate: Date.parse(dvd.xdd),
    dividendYield,
    path: dvd.path,
  };
};
