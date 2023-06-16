import { autoInjectable } from 'tsyringe';
import { UserRepo } from '@repository/';

@autoInjectable()
export class UserService {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }
}
