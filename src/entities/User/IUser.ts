import { IBorrowedBooksByUser, IUserSubscription } from '.'
import { IBaseSchema } from '../BaseSchema';

export interface IUser extends IBaseSchema {
  firstName: string;
  lastName: string;
  subscription:IUserSubscription;
  borrowedBooksByUser: IBorrowedBooksByUser[];
}