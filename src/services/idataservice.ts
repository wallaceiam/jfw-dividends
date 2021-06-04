import { IDividend } from "../models/dividend";
import { FileDataService } from "./fileDataService";

export interface IDataService {
  getDataForRegion(region: string): Promise<IDividend[]>;
}

export const getDataService = () => new FileDataService();