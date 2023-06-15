import { autoInjectable } from 'tsyringe';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BookService } from '@service/';
import { GetAllBooksDTO } from '@dtos/';

@autoInjectable()
export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public async getAllBooks(body: GetAllBooksDTO) {
    try {
      const getAllBooksDTO = plainToClass(GetAllBooksDTO, body);
      await validateOrReject(getAllBooksDTO, { validationError: { target: false } });
      const books = await this.bookService.getAllBooks(getAllBooksDTO);
      return books;
    } catch (error) {
      throw error;
    }
  }
}
