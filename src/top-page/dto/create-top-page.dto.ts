import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategoryEnum } from './top-level-category.constants';


export class HHDateDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

export class PageAdvantagesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {

  @IsEnum(TopLevelCategoryEnum)
  firstLevel: TopLevelCategoryEnum;

  @IsString()
  alias: string;

  @IsString()
  secondLevel: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsArray()
  @ValidateNested()
  @Type(() => PageAdvantagesDto)
  advantages: PageAdvantagesDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => HHDateDto)
  hh?: HHDateDto;

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}