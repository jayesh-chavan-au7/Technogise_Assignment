import 'reflect-metadata';
import { bookController } from '@controller/';
import books from '../../../MOCK/BOOK_MOCK.json';

describe('borrowBook controller', () => {
  it('should return borrowed book', async () => {
    const borrowedAt = new Date();
    const dueDate = new Date();
    jest.spyOn(bookController['bookService'], 'borrowBook').mockResolvedValue({
      bookId: '1',
      title: books[0].title,
      borrowedAt,
      dueDate,
    });
    const result = await bookController.borrowBook({
      bookId: '1',
      userId: '1',
    });
    expect(result).toEqual({
      bookId: '1',
      title: books[0].title,
      borrowedAt,
      dueDate,
    });
  });
  it('should throw error if bookId is invalid', async () => {
    try {
      await bookController.borrowBook({
        bookId: undefined as any,
        userId: '1',
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          target: { bookId: undefined, userId: '1' },
          value: undefined,
          property: 'bookId',
          children: [],
          constraints: {
            isString: 'bookId must be a string',
            isNotEmpty: 'bookId should not be empty',
          },
        },
      ]);
    }
  });
  it('should throw error if userId is invalid', async () => {
    try {
      await bookController.borrowBook({
        bookId: '123',
        userId: undefined as any,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          target: { bookId: '123', userId: undefined },
          value: undefined,
          property: 'userId',
          children: [],
          constraints: {
            isString: 'userId must be a string',
            isNotEmpty: 'userId should not be empty',
          },
        },
      ]);
    }
  });
  it('should throw error if book service throw error', async () => {
    jest
      .spyOn(bookController['bookService'], 'borrowBook')
      .mockRejectedValue(new Error('error'));
    try {
      await bookController.borrowBook({
        bookId: '123',
        userId: '1',
      });
    } catch (error: any) {
      expect(error?.message).toBe('error');
    }
  });
});
