export interface ILink {
  rel: string;
  href: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface IMetadata {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ApiResource<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  meta?: IMetadata;
  _links: ILink[];
}
