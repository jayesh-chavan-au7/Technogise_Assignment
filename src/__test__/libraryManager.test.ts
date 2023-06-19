import 'reflect-metadata';
import Table from 'cli-table';
import { container } from 'tsyringe';
import LibraryManager from '../LibraryManager';
import * as utils from '@utils/';

jest.mock('@utils/', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@utils/'),
  };
});

describe('LibraryManager', () => {
  const libraryManager = container.resolve(LibraryManager);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize table', () => {
    expect(libraryManager['tabel']).toBeInstanceOf(Table);
  });

  it('should fetch books on fetch book action for page 1', async () => {
    await libraryManager.fetchBookAction();
    expect(libraryManager.bookPaginationState.booksCollection.length).toBe(10);
  });

  it('should fetch more books on fetch more book action for page 2', async () => {
    await libraryManager.fetchBookAction();
    expect(libraryManager.bookPaginationState.booksCollection.length).toBe(11);
  });

  it('Since there are no books available after the 11th book, the "Fetch More Books" action for page 3 should return same data', async () => {
    await libraryManager.fetchBookAction();
    expect(libraryManager.bookPaginationState.booksCollection.length).toBe(11);
  });

  it('should borrow book', async () => {
    const getIdByPromptSpy = jest
      .spyOn(utils, 'getIdByPrompt')
      .mockImplementation(jest.fn());
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    getIdByPromptSpy
      .mockResolvedValueOnce(Promise.resolve('1'))
      .mockResolvedValueOnce(Promise.resolve('123'));

    await libraryManager.borrowBookAction();
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('Book ID: 1');
    expect(getIdByPromptSpy).toHaveBeenCalledTimes(2);
  });
});
