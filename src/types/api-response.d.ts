export type PaginatedResults<T> = {
  page: number;
  limit: number;
  pages: number;
  items: T[];
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  result?: PaginatedResults<T> | T | T[] | null;
  error?: any;
};
