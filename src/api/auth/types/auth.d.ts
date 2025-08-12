interface ISession {
  email: string;
  id: string;
  date_issued: Date;
  expiration?: string;
}

interface ILoginDetails {
  id: string;
  token: string;
}
