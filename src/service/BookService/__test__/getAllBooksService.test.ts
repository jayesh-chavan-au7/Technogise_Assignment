import 'reflect-metadata';
import 'module-alias/register';
import { container } from 'tsyringe';
import { BookService } from '@service/';
import books from '../../../MOCK/BOOK_MOCK.json';

describe('getAllBooks service', () => {
  const bookService = container.resolve(BookService);

  it('should return books without any filter', async () => {
    const result = await bookService.getAllBooks({
      filter: {},
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: books.slice(0, 2),
      total: 20,
    });
  });
  it('should filter books by title', async () => {
    const result = await bookService.getAllBooks({
      filter: {
        title: 'Book 1',
      },
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: books.slice(0, 1),
      total: 1,
    });
  });
  it('should filter books by author', async () => {
    const result = await bookService.getAllBooks({
      filter: {
        author: 'Author 1',
      },
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: books.slice(0, 1),
      total: 1,
    });
  });
  it('should filter books by isAvailable', async () => {
    const result = await bookService.getAllBooks({
      filter: {
        isAvailable: true,
      },
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: books.slice(0, 2),
      total: 11,
    });
  });
  it('should filter books by category', async () => {
    const result = await bookService.getAllBooks({
      filter: {
        category: 'Category 1',
      },
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: books.slice(0, 1),
      total: 1,
    });
  });
  it('should throw error if repo throws error', async () => {
    jest
      .spyOn(bookService['bookRepo'], 'getAllBooks')
      .mockImplementation(() => {
        throw new Error('error');
      });

    const result = bookService.getAllBooks({
      filter: {
        category: 'Category 1',
      },
      limit: 2,
      skip: 0,
    });
    await expect(result).rejects.toThrow();
  });
});
