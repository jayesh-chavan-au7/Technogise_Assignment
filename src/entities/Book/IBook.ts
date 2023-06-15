import { IBorrowDetails } from './';

export interface IBook {
  id: string;
  title: string;
  description: string;
  author: string;
  publisher: string;
  avarageRating: number;
  totalRatings: number;
  totalReviews: number;
  price: number;
  tags: string[];
  category: string;
  language: string;
  createdAt: Date;
  updatedAt?: Date;
  isAvailable: boolean;
  numberOfCopies: number;
  borrowDetails: IBorrowDetails[];
  timesBorrowed: number;
}
