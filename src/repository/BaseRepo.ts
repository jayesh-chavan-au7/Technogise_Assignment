import fs from 'fs';
import path from 'path';
import { IModelDetails } from 'ModelDetails';
import { IGetAll } from 'BaseRepo';
import { IBaseSchema } from '@entities/';

export class BaseRepo<D extends IBaseSchema> {
  private modelDetails: IModelDetails;

  constructor(modelDetails: IModelDetails) {
    this.modelDetails = modelDetails;
  }

  protected getModelPath(modelDetails: IModelDetails): string {
    const { path: modelPath } = modelDetails;
    return path.join(__dirname, modelPath);
  }

  protected async getAll<D extends IBaseSchema>(
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

  protected async getById<D extends IBaseSchema>(
    id: string
  ): Promise<D | void> {
    const modelPath = this.getModelPath(this.modelDetails);
    const data = await fs.promises.readFile(modelPath, 'utf-8');
    const parsedData: D[] = JSON.parse(data);
    const item: D | void = parsedData.find((item) => item['id'] === id);
    return item;
  }

  protected async updateById<D extends IBaseSchema>(
    id: string,
    dataToUpdate: D
  ): Promise<D | void> {
    const modelPath = this.getModelPath(this.modelDetails);
    const data = await fs.promises.readFile(modelPath, 'utf-8');
    const parsedData: D[] = JSON.parse(data);
    const updatedData = parsedData.map((item) => {
      if (item['id'] === id) {
        return {
          ...item,
          ...dataToUpdate,
        };
      }
      return item;
    });
    await fs.promises.writeFile(modelPath, JSON.stringify(updatedData));
    return dataToUpdate;
  }
}
