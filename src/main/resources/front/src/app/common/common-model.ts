export class SearchDTO<T> {
  first: number;
  rows: number;
  sortOrder: number;
  sortField: string;
  filter: T;
}
