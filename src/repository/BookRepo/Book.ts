import { IBook } from '@entities/';
import { BaseRepo } from '../BaseRepo';
import { bookModelDetails } from './modelDetails';

export class BookRepo extends BaseRepo<IBook> {
  constructor() {
    super(bookModelDetails);
  }

  public async getAllBooks(
    filter: Partial<IBook>,
    limit: number,
    skip: number
  ) {
    return this.getAll(filter, limit, skip);
  }
}
