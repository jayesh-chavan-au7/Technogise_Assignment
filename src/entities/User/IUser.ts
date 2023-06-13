import { IBorrowedBooksDetails, IUserSubscription } from '.'

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  subscription:IUserSubscription;
  createdAt: Date;
  updatedAt?: Date;
  borrowedBooks: IBorrowedBooksDetails[];
  borrowedAt?: Date;
  dueDate?: Date;
}