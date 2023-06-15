import { container } from 'tsyringe';
import { BookController } from './Book';

const bookController = container.resolve(BookController);

export { bookController };
