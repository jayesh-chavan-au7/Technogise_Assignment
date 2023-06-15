import { autoInjectable } from 'tsyringe';
import { BookRepo } from '@repository/';
import { GetAllBooksDTO } from '@dtos/';


@autoInjectable()
export class BookService {
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }

  /**
   * 
   * @param getAllBooksDTO 
   * @returns {Promise<IGetAll<IBook>>}
   */
  public async getAllBooks(getAllBooksDTO: GetAllBooksDTO) {
    const { filter, limit, skip } = getAllBooksDTO;
    return this.bookRepo.getAllBooks(filter, limit, skip);
  }
}
