import 'reflect-metadata';
import LibraryServerManager from '../LibraryServerManager';
import { container } from 'tsyringe';
import * as utils from '@utils/';
import { UserInputEventsEnum } from '@enums/';
import LibraryManager from '../LibraryManager';

jest.mock('@utils/', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@utils/'),
  };
});

describe('LibraryServerManager', () => {
  const libraryServerManager = container.resolve(LibraryServerManager);

  it('should start library server and responce to exist action', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const triggerPromptSpy = jest
      .spyOn(utils, 'triggerPrompt')
      .mockImplementation(jest.fn());

    triggerPromptSpy.mockResolvedValueOnce(
      Promise.resolve(UserInputEventsEnum.exist)
    );

    await libraryServerManager.start();
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain(
      '===================================='
    );
    expect(consoleLogSpy.mock.calls[1][0]).toContain('WELCOME TO BOOK LIBRARY');
  });

  it('should start library server and responce to fetch book action', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const triggerPromptSpy = jest
      .spyOn(utils, 'triggerPrompt')
      .mockImplementation(jest.fn());

    const fetchBookActionSpy = jest.spyOn(
      LibraryManager.prototype,
      'fetchBookAction'
    );

    triggerPromptSpy
      .mockResolvedValueOnce(Promise.resolve(UserInputEventsEnum.fetchBooks))
      .mockResolvedValueOnce(Promise.resolve(UserInputEventsEnum.exist));

    fetchBookActionSpy.mockResolvedValueOnce(Promise.resolve());

    await libraryServerManager.start();
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain(
      '===================================='
    );
    expect(consoleLogSpy.mock.calls[1][0]).toContain('WELCOME TO BOOK LIBRARY');
    expect(fetchBookActionSpy).toHaveBeenCalled();
  });

  it('should start library server and responce to fetch more book action', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const triggerPromptSpy = jest
      .spyOn(utils, 'triggerPrompt')
      .mockImplementation(jest.fn());

    const fetchMoreBookActionSpy = jest.spyOn(
      LibraryManager.prototype,
      'fetchBookAction'
    );

    triggerPromptSpy
      .mockResolvedValueOnce(
        Promise.resolve(UserInputEventsEnum.fetchMoreBooks)
      )
      .mockResolvedValueOnce(Promise.resolve(UserInputEventsEnum.exist));

    fetchMoreBookActionSpy.mockResolvedValueOnce(Promise.resolve());

    await libraryServerManager.start();
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain(
      '===================================='
    );
    expect(consoleLogSpy.mock.calls[1][0]).toContain('WELCOME TO BOOK LIBRARY');
    expect(fetchMoreBookActionSpy).toHaveBeenCalled();
  });
  it('should start library server and responce to borrow book action', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const triggerPromptSpy = jest
      .spyOn(utils, 'triggerPrompt')
      .mockImplementation(jest.fn());

    const borrowBookActionSpy = jest.spyOn(
      LibraryManager.prototype,
      'borrowBookAction'
    );

    triggerPromptSpy
      .mockResolvedValueOnce(Promise.resolve(UserInputEventsEnum.borrowBook))
      .mockResolvedValueOnce(Promise.resolve(UserInputEventsEnum.exist));

    borrowBookActionSpy.mockResolvedValueOnce(Promise.resolve());

    await libraryServerManager.start();
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain(
      '===================================='
    );
    expect(consoleLogSpy.mock.calls[1][0]).toContain('WELCOME TO BOOK LIBRARY');
    expect(borrowBookActionSpy).toHaveBeenCalled();
  });
});
