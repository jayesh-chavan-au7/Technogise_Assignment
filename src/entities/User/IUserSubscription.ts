import { UserSubscriptionEnum } from '.';

export interface IUserSubscription {
  subId: string;
  subscriptionName: UserSubscriptionEnum;
  subscriptionDescription: string;
  subscriptionPrice: number;
  subscriptionDuration: number;
  subscriptionBooksLimit: number;
}
