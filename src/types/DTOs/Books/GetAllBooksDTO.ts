import {
 IsInt,
 IsNotEmpty,
 IsDefined,
 IsObject,
 ValidateNested,
 Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GetAllBooksFilterDTO } from './GetAllBooksFilterDTO';

export class GetAllBooksDTO {
 @IsDefined()
 @IsObject()
 @ValidateNested()
 @Type(() => GetAllBooksFilterDTO)
 filter!: GetAllBooksFilterDTO;

 @IsInt()
 @Min(1)
 @IsNotEmpty()
 limit!: number;

 @IsInt()
 @Min(0)
 @IsNotEmpty()
 skip!: number;
}