import 'reflect-metadata';
import { container } from 'tsyringe';
import { BookController } from '@controller/';
import books from '../../../MOCK/BOOK_MOCK.json';

describe('getAllBooks controller', () => {
  const bookController = container.resolve(BookController);

  it('should return books without any filter', async () => {
    const result = await bookController.getAllBooks({
      filter: {},
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: books.slice(0, 2),
      total: 20,
    });
  });
  it('should return books with filter, limit and skip', async () => {
    const result = await bookController.getAllBooks({
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
  it('should return empty array of data if no book found', async () => {
    const result = await bookController.getAllBooks({
      filter: {
        title: 'Book 100',
      },
      limit: 2,
      skip: 0,
    });
    expect(result).toEqual({
      data: [],
      total: 0,
    });
  });
  it('should throw error if getAllBooksDTO is invalid with filter', async () => {
    try {
      await bookController.getAllBooks({
        filter: undefined as any,
        limit: 2,
        skip: 0,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: undefined,
          property: 'filter',
          children: [],
          constraints: {
            isDefined: 'filter should not be null or undefined',
            isObject: 'filter must be an object',
          },
        },
      ]);
    }
  });
  it('should throw error if getAllBooksDTO is invalid with title in filter', async () => {
    try {
      await bookController.getAllBooks({
        filter: { title: 123 } as any,
        limit: 2,
        skip: 0,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: { title: 123 },
          property: 'filter',
          children: [
            {
              value: 123,
              property: 'title',
              children: [],
              constraints: { isString: 'title must be a string' },
            },
          ],
        },
      ]);
    }
  });
  it('should throw error if getAllBooksDTO is invalid with author in filter', async () => {
    try {
      await bookController.getAllBooks({
        filter: { author: 123 } as any,
        limit: 2,
        skip: 0,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: { author: 123 },
          property: 'filter',
          children: [
            {
              value: 123,
              property: 'author',
              children: [],
              constraints: { isString: 'author must be a string' },
            },
          ],
        },
      ]);
    }
  });
  it('should throw error if getAllBooksDTO is invalid with category in filter', async () => {
    try {
      await bookController.getAllBooks({
        filter: { category: 123 } as any,
        limit: 2,
        skip: 0,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: { category: 123 },
          property: 'filter',
          children: [
            {
              value: 123,
              property: 'category',
              children: [],
              constraints: { isString: 'category must be a string' },
            },
          ],
        },
      ]);
    }
  });
  it('should throw error if getAllBooksDTO is invalid with isAvailable in filter', async () => {
    try {
      await bookController.getAllBooks({
        filter: { isAvailable: 123 } as any,
        limit: 2,
        skip: 0,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: { isAvailable: 123 },
          property: 'filter',
          children: [
            {
              value: 123,
              property: 'isAvailable',
              children: [],
              constraints: { isBoolean: 'isAvailable must be a boolean value' },
            },
          ],
        },
      ]);
    }
  });
  it('should throw error if getAllBooksDTO is invalid with limit', async () => {
    try {
      await bookController.getAllBooks({
        filter: {},
        limit: -1,
        skip: 0,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: -1,
          property: 'limit',
          children: [],
          constraints: { min: 'limit must not be less than 1' },
        },
      ]);
    }
  });
  it('should throw error if getAllBooksDTO is invalid with skip', async () => {
    try {
      await bookController.getAllBooks({
        filter: {},
        limit: 5,
        skip: -1,
      });
    } catch (error) {
      expect(error).toMatchObject([
        {
          value: -1,
          property: 'skip',
          children: [],
          constraints: { min: 'skip must not be less than 0' },
        },
      ]);
    }
  });
  it('should throw error if service throws error', async () => {
    jest
      .spyOn(bookController['bookService'], 'getAllBooks')
      .mockImplementation(() => {
        throw new Error('error');
      });
    try {
      await bookController.getAllBooks({
        filter: {
          title: 'Book 1',
        },
        limit: 2,
        skip: 0,
      });
    } catch (error: any) {
      expect(error?.message).toBe('error');
    }
  });
});
