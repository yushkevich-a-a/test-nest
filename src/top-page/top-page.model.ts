export enum TopLevelCategory {
  courses = 'courses',
  services = 'services',
  books = 'books',
  product = 'product',
}

export class TopPageModel {
  _id: string;
  firstLevel: TopLevelCategory;
  secondLevel: string;
  title: string;
  category: string;
  advantages: {
    title: string;
    description: string;
  }[];
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
