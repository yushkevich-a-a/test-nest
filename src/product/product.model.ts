export class ProductModel {
  _id: string;
  image: string;
  titleCourse: string;
  descriptionCourse: string;
  rateCount: number;
  price: number;
  oldPrice: number;
  credit: number;
  advantages: string[];
  disAdvantages: string[];
  options: {
    [key: string]: string;
  };
  categories: string[];
  tabs: string[];
}
