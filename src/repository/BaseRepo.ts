import fs from 'fs';
import path from 'path';
import { IModelDetails } from 'ModelDetails';
import { IGetAll } from 'BaseRepo';

export class BaseRepo<D> {
  private modelDetails: IModelDetails;

  constructor(modelDetails: IModelDetails) {
    this.modelDetails = modelDetails;
  }

  protected getModelPath(modelDetails: IModelDetails): string {
    const { path: modelPath } = modelDetails;
    return path.join(__dirname, modelPath);
  }

  protected async getAll<D>(
    filter: Partial<D> = {},
    limit: number = 10,
    skip: number = 0
  ): Promise<IGetAll<D>> {
    const modelPath = this.getModelPath(this.modelDetails);
    const data = await fs.promises.readFile(modelPath, 'utf-8');
    const parsedData: D[] = JSON.parse(data);
    const filteredData = parsedData.filter((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
    return {
      total: filteredData.length,
      data: filteredData.slice(skip, limit),
    };
  }
}
