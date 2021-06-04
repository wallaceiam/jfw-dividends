import { promises as fs } from 'fs';
import path from 'path';

import { IDividendMax, map } from "../models/dividend";
import { IDataService } from "./idataservice";

export class FileDataService implements IDataService {
  
  async getDataForRegion(region: string) {
    const postsDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(postsDirectory, `${region}.json`)
    const res = await fs.readFile(filePath, 'utf8')
    const data: IDividendMax[] = JSON.parse(res);
    return data.map((d, i) => map(d, i));
  }

}