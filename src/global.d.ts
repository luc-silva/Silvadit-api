namespace Express {
  interface Request {
    user: string | null;
    session?: ISession
    userData?: ICompleteUser | null
  }
}

interface IOrder {
  direction: 'ASC' | 'DESC';
  column: string;
}