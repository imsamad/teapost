export interface PaginationType {
  next: number;
  prev: number;
  limit: number;
  totalRecords:number;
  totalPages:number;
  overflow:boolean
}
