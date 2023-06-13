import { UserSubscriptionEnum } from '.';

export interface IUserSubscription {
  id: number;
  subscriptionName: UserSubscriptionEnum;
  subscriptionDescription: string;
  subscriptionPrice: number;
  subscriptionDuration: number;
  subscriptionBooksLimit: number;
  createdAt: Date;
  updatedAt?: Date;
}
