import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  username: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @Max(5, { message: 'рейтинг не может быть больше 5' })
  @Min(1, { message: 'рейтинг не может быть меньше 1' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
