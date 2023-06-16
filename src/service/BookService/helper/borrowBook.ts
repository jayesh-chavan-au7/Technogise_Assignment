import {
  IBook,
  IBorrowDetails,
  IBorrowedBooksByUser,
  IUser,
} from '@entities/';
import { errors } from '@utils/';

export const checkIfBookAvailable = (book: IBook | void) => {
  if (!book) {
    throw new Error(errors.bookNotFound);
  }
  if (!book.isAvailable) {
    throw new Error(errors.bookNotAvailable);
  }
};

export const checkIfUserCanBorrowBook = (user: IUser | void) => {
  if (!user) {
    throw new Error(errors.userNotFound);
  }
  if (
    user.borrowedBooksByUser.length >= user.subscription.subscriptionBooksLimit
  ) {
    throw new Error(errors.userExceededBorrowedBooksLimit);
  }
};

export const getBorrowedBookDetails = (userId: string): IBorrowDetails => ({
  borrowedBy: userId,
  borrowedAt: new Date(),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

export const getBorrowedBookByUser = (
  bookId: string,
  book: IBook,
  borrowDetail: IBorrowDetails
): IBorrowedBooksByUser => ({
  bookId,
  title: book.title,
  borrowedAt: borrowDetail.borrowedAt,
  dueDate: borrowDetail.dueDate,
});
