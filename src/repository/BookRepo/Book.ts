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
    return this.getAll<IBook>(filter, limit, skip);
  }

  public async getBookById(bookId: string) {
    return this.getById<IBook>(bookId);
  }

  public async updateBookById(bookId: string, book: IBook) {
    return this.updateById<IBook>(bookId, book);
  }
}
