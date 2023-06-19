import 'reflect-metadata';
import 'module-alias/register';
import { container } from 'tsyringe';
import { BookService } from '@service/';
import { IUser, IBook } from '@entities/';
import { errors } from '@utils/';
import books from '../../../MOCK/BOOK_MOCK.json';
import users from '../../../MOCK/USER_MOCK.json';

describe('borrowBook service', () => {
  const bookService = container.resolve(BookService);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return borrowed book', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockResolvedValue(books[0] as unknown as IBook);
    jest
      .spyOn(bookService['userRepo'], 'getUserById')
      .mockResolvedValue(users[0] as unknown as IUser);
    jest.spyOn(bookService['bookRepo'], 'updateBookById').mockResolvedValue();
    jest.spyOn(bookService['userRepo'], 'updateUserById').mockResolvedValue();

    const result = await bookService.borrowBook({
      bookId: '1',
      userId: '123',
    });
    expect(result).toEqual({
      bookId: '1',
      title: books[0].title,
      borrowedAt: expect.any(Date),
      dueDate: expect.any(Date),
    });
  });

  it('should throw error if bookRepo unable to fetch book', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockImplementation(() => {
        throw new Error('Unable to fetch book');
      });

    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error('Unable to fetch book'));
    }
  });
  it('should throw error if book is not found', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockImplementation(() => Promise.resolve(undefined));

    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error(errors.bookNotFound));
    }
  });
  it('should throw error if book is not available', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockResolvedValue({ isAvailable: false } as unknown as IBook);
    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error(errors.bookNotAvailable));
    }
  });
  it('should throw error if user is not found', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockResolvedValue(books[0] as unknown as IBook);
    jest
      .spyOn(bookService['userRepo'], 'getUserById')
      .mockImplementation(() => Promise.resolve(undefined));

    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error(errors.userNotFound));
    }
  });
  it('should throw error if user exceeded borrowed books limit', async () => {
    jest
      .spyOn(bookService['userRepo'], 'getUserById')
      .mockResolvedValue({ ...users[0], borrowedBooksByUser: [{}, {}] } as unknown as IUser);

    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error(errors.userExceededBorrowedBooksLimit));
    }
  });
  it('should throw error if bookRepo unable to update book', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockResolvedValue(books[0] as unknown as IBook);
    jest
      .spyOn(bookService['userRepo'], 'getUserById')
      .mockResolvedValue(users[0] as unknown as IUser);
    jest
      .spyOn(bookService['bookRepo'], 'updateBookById')
      .mockImplementation(() => {
        throw new Error('Unable to update book');
      });

    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error('Unable to update book'));
    }
  });
  it('should throw error if userRepo unable to update user', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getBookById')
      .mockResolvedValue(books[0] as unknown as IBook);
    jest
      .spyOn(bookService['userRepo'], 'getUserById')
      .mockResolvedValue(users[0] as unknown as IUser);
    jest.spyOn(bookService['bookRepo'], 'updateBookById').mockResolvedValue();
    jest
      .spyOn(bookService['userRepo'], 'updateUserById')
      .mockImplementation(() => {
        throw new Error('Unable to update user');
      });

    try {
      await bookService.borrowBook({
        bookId: '1',
        userId: '123',
      });
    } catch (error) {
      expect(error).toEqual(new Error('Unable to update user'));
    }
  });
});
