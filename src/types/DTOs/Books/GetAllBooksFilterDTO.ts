import { IsString, IsNotEmpty, IsBoolean, IsDefined, IsOptional } from 'class-validator';

export class GetAllBooksFilterDTO {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
