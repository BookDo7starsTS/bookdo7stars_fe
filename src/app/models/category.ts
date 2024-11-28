export interface Category {
  id: number;
  name: string;
  parent_id: number;
  level: number;
  route: string;
  children: Category[];
}
