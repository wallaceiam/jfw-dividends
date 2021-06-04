import { IDividendMax, map } from "../models/dividend";
import { IDataService } from "./idataservice";

export class DividendMaxDataService implements IDataService {
  
  async getDataForRegion(region: string) {
    // eslint-disable-next-line no-nested-ternary
    const id = region === 'uk' ? 1 : (region === 'us' ? 6 : 7);
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(`https://www.dividendmax.com/dividends/declared.json?region=${id}`);
    // eslint-disable-next-line no-await-in-loop
    const data: IDividendMax[] = await res.json();
    return data.map((d, i) => map(d, i));
  }

}