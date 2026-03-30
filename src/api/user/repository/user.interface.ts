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
  id: string;
}

export interface IUpdateUserLocationParams {
  country: string;
  state: string;
  user_id: string;
}
