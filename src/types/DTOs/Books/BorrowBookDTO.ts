import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowBookDTO {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  bookId!: string;
}