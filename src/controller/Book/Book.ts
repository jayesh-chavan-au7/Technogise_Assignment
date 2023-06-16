import { autoInjectable } from 'tsyringe';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BookService } from '@service/';
import { BorrowBookDTO, GetAllBooksDTO } from '@dtos/';

@autoInjectable()
export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public async getAllBooks(body: GetAllBooksDTO) {
    try {
      const getAllBooksDTO = plainToClass(GetAllBooksDTO, body);
      await validateOrReject(getAllBooksDTO);
      const books = await this.bookService.getAllBooks(getAllBooksDTO);
      return books;
    } catch (error) {
      throw error;
    }
  }

  public async borrowBook(body: BorrowBookDTO) {
    try {
      const borrowBookDTO = plainToClass(BorrowBookDTO, body);
      await validateOrReject(borrowBookDTO);
      const borrowedBook = await this.bookService.borrowBook(body);
      return borrowedBook;
    } catch (error) {
      throw error;
    }
  }
}
