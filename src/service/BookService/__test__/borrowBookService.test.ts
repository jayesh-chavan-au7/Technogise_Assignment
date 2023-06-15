import 'reflect-metadata';
import 'module-alias/register';
import { container } from 'tsyringe';
import { BookService } from '@service/';
import books from '../../../MOCK/BOOK_MOCK.json';
import users from '../../../MOCK/USER_MOCK.json';

describe('borrowBook service', () => {
 it('should return borrowed book', async () => {});
 it('should throw error if bookRepo unable to fetch book', async () => {});
 it('should throw error if book is not found', async () => {});
 it('should throw error if user is not found', async () => {});
 it('should throw error if user exceeded borrowed books limit', async () => {});
 it('should throw if book is already borrowed by user', async () => {});
 it('should throw error if bookRepo unable to update book', async () => {});
});
