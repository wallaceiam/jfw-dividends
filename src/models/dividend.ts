import * as accounting from "accounting";

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
  readonly dividendCcy: string;
  readonly nextAmount: number;
  readonly previousAmount: number;
  readonly exDividendDate: number;
  readonly dividendYield: number;
  readonly path: string;
  readonly raw: IDividendMax;
}

export const map = (dvd: IDividendMax, id: number): IDividend => {
  const [ccy, dividendCcy] = getCurrencies(dvd);
  const price = accounting.unformat(dvd.price);
  const nextAmount = accounting.unformat(dvd.amnt) / 100;
  const previousAmount = accounting.unformat(dvd.prev) / 100;

  const dividendYield =
    ccy === dividendCcy ? (nextAmount + previousAmount) / price : 0;

  return {
    id,
    name: dvd.name,
    ticker: dvd.ticker,
    flag: dvd.flag,
    market: dvd.mic,
    price,
    ccy,
    dividendCcy,
    nextAmount,
    previousAmount,
    exDividendDate: Date.parse(dvd.xdd),
    dividendYield,
    path: dvd.path,
    raw: dvd,
  };
};

const getCurrencies = (dvd: IDividendMax): [string, string] => {
  const start = toCurrency(dvd.price, dvd.price.match(/(.*?)[\d\.]/));
  const end = toCurrency(dvd.amnt, dvd.amnt.match(/[\d\.]+(.*?)$/));

  if (start === "CAD" && end === "USD") {
    return [start, start];
  }

  return [start, end];
};

const toCurrency = (str: string, match: RegExpMatchArray | null): string => {
  if (match === null) throw new Error(`Unknown CCY ${str}`);

  switch (match[1]) {
    case "£":
    case "p":
      return "GBP";
    case "$":
    case "c":
      return "USD";
    case "C$":
      return "CAD";
    case "€":
    case "¢":
      return "EUR";
    case "kr":
    case "öre":
      return "SEK";
    case "zł":
    case "gr":
      return "PLN";
    case "Fr.":
    case "Fr":
      return "CHF";
  }

  throw new Error(`Unknown CCY ${str}`);
};
