import Table from 'cli-table';
import { BookController } from '@controller/';
import { IBook } from '@entities/';
import { formatBooksDataForTable, getIdByPrompt } from '@utils/';
import { config } from '@config/';
import { autoInjectable } from 'tsyringe';

const { tableConfig, pageSize } = config;

@autoInjectable()
class LibraryManager {
  private tabel!: Table;
  public bookPaginationState: {
    booksCollection: IBook[];
    skip: number;
    limit: number;
    totalBooks: number;
  } = {
    booksCollection: [],
    skip: 0,
    limit: pageSize,
    totalBooks: 0,
  };

  constructor(private bookController: BookController) {
    this.bookController = bookController;
    this.initTable();
  }

  private initTable() {
    this.tabel = new Table(tableConfig);
  }

  public async fetchBookAction() {
    const { booksCollection } = this.bookPaginationState;

    this.bookPaginationState.skip = booksCollection.length;
    this.bookPaginationState.limit = pageSize + booksCollection.length;
    const newBooks = await this.bookController.getAllBooks({
      filter: { isAvailable: true },
      limit: this.bookPaginationState.limit,
      skip: this.bookPaginationState.skip,
    });
    this.bookPaginationState.booksCollection = [
      ...booksCollection,
      ...newBooks.data,
    ];
    this.bookPaginationState.totalBooks = newBooks.total;
    this.tabel.push(...formatBooksDataForTable(newBooks.data));
    console.log(this.tabel.toString());
  }

  public async borrowBookAction() {
    const bookId = await getIdByPrompt('Enter book id to borrow', 'bookId');
    const userId = await getIdByPrompt('Enter user id to borrow', 'userId');

    const book = await this.bookController.borrowBook({
      bookId,
      userId,
    });

    const borrowDetails = `
     Book ID: ${book.bookId}
     Title: ${book.title}
     Borrowed At: ${book.borrowedAt.toLocaleDateString()}
     Due Date: ${book.dueDate.toLocaleDateString()}
   `;
    console.log(borrowDetails);
    this.tabel.length = 0;
    this.bookPaginationState.booksCollection = [];
    this.bookPaginationState.skip = 0;
    this.bookPaginationState.limit = pageSize;
    this.bookPaginationState.totalBooks = 0;
  }
}

export default LibraryManager;
