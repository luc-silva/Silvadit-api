namespace Express {
  interface Request {
    user: string | null;
  }
}

interface IOrder {
  direction: 'ASC' | 'DESC';
  column: string;
}