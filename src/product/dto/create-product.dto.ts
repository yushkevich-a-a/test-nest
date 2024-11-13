import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductCharacteristicsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  image: string;

  @IsString()
  titleCourse: string;

  @IsString()
  descriptionCourse: string;

  @IsNumber()
  rateCount: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice: number;

  @IsNumber()
  credit: number;

  @IsArray()
  @IsString({ each: true })
  advantages: string[];

  @IsArray()
  @IsString({ each: true })
  disAdvantages: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  options: ProductCharacteristicsDto[];

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tabs: string[];
}
