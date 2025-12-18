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

export interface IUpdateUserDetailsParams {
  first_name: string;
  last_name: string;
  description?: string | null;
  username: string;
  user_id: string
}
