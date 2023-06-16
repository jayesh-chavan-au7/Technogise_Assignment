import { IUser } from '@entities/';
import { BaseRepo } from '../BaseRepo';
import { userModelDetails } from './modelDetails';

export class UserRepo extends BaseRepo<IUser> {
  constructor() {
    super(userModelDetails);
  }

  public async getUserById(bookId: string) {
    return this.getById<IUser>(bookId);
  }

  public async updateUserById(userId: string, uesr: IUser) {
    return this.updateById<IUser>(userId, uesr);
  }
}
