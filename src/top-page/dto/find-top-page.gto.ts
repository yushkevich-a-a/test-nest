import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';
import { TopLevelCategoryEnum } from './top-level-category.constants';

export class FindTopPageDto {
  @IsEnum(TopLevelCategoryEnum)
  firstLevel: TopLevelCategory;
}
