import { IBaseSchema } from '../BaseSchema';
import { IBorrowDetails } from './';

export interface IBook extends IBaseSchema{
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
  isAvailable: boolean;
  numberOfCopies: number;
  borrowDetails: IBorrowDetails[];
  timesBorrowed: number;
}
