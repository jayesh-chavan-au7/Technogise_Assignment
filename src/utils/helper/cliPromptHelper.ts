import { prompt } from 'enquirer';
import { UserInputEventsEnum } from '@enums/';
import { IBook } from '@entities/';

export const triggerPrompt = async (message: string, choices: string[]) => {
  const res: { action: string } = await prompt({
    type: 'select',
    name: 'action',
    message,
    choices,
  });
  return res.action;
};

export const getIdByPrompt = async (message: string, idName: string) => {
  const response: { [key in typeof idName]: string } = await prompt({
    type: 'input',
    name: idName,
    message,
  });
  return response[idName];
};

export const getInputEvents = (booksShell: IBook[], totalBooks: number) => {
  return booksShell.length === 0 && totalBooks === 0
    ? [UserInputEventsEnum.fetchBooks, UserInputEventsEnum.exist]
    : booksShell.length === totalBooks
    ? [UserInputEventsEnum.borrowBook, UserInputEventsEnum.exist]
    : [
        UserInputEventsEnum.fetchMoreBooks,
        UserInputEventsEnum.borrowBook,
        UserInputEventsEnum.exist,
      ];
};
