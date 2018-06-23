export class SearchDTO<T> {
  first: number;
  rows: number;
  sortOrder: number;
  sortField: string;
  filter: T;
}

export class ResponseDTO<T> {
  totalElements: number;
  totalPages: number;
  data: T;
}
