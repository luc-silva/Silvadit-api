export interface ICreateUserParams {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  description?: string;
  country: string;
  state: string;
}

export interface IUpdateUserParams {
  first_name: string;
  last_name: string;
  country: string;
  state: string;
  description: string;
}
