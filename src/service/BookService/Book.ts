import { autoInjectable } from 'tsyringe';
import { BookRepo, UserRepo } from '@repository/';
import { BorrowBookDTO, GetAllBooksDTO } from '@dtos/';
import {
  checkIfBookAvailable,
  checkIfUserCanBorrowBook,
  getBorrowedBookByUser,
  getBorrowedBookDetails,
} from './helper';
import { IBook, IUser } from '@entities/';

@autoInjectable()
export class BookService {
  private bookRepo: BookRepo;
  private userRepo: UserRepo;

  constructor(bookRepo: BookRepo, userRepo: UserRepo) {
    this.userRepo = userRepo;
    this.bookRepo = bookRepo;
  }

  public async getAllBooks(getAllBooksDTO: GetAllBooksDTO) {
    const { filter, limit, skip } = getAllBooksDTO;
    return this.bookRepo.getAllBooks(filter, limit, skip);
  }

  public async borrowBook(borrowBookDTO: BorrowBookDTO) {
    const { bookId, userId } = borrowBookDTO;

    const [book, user] = await Promise.all([
      this.bookRepo.getBookById(bookId),
      this.userRepo.getUserById(userId),
    ]);

    checkIfBookAvailable(book);
    checkIfUserCanBorrowBook(user);

    const { borrowDetails, numberOfCopies, timesBorrowed } = book as IBook;
    const { borrowedBooksByUser } = user as IUser;
    const borrowDetail = getBorrowedBookDetails(userId);
    const updatedBorrowedBooksByUser = getBorrowedBookByUser(bookId, book as IBook, borrowDetail);
    
    const updatedBorrowDetails = [...borrowDetails, borrowDetail];
    const bookToBeUpdated: IBook = {
      ...book as IBook,
      isAvailable: numberOfCopies > updatedBorrowDetails.length,
      borrowDetails: updatedBorrowDetails,
      timesBorrowed: timesBorrowed + 1,
    };
    const updatedUser: IUser = {
      ...user as IUser,
      borrowedBooksByUser: [...borrowedBooksByUser, updatedBorrowedBooksByUser],
    };

    await this.bookRepo.updateBookById(bookId, bookToBeUpdated);
    await this.userRepo.updateUserById(userId, updatedUser);

    return updatedBorrowedBooksByUser;
  }
}
