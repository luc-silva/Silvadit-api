interface IPreRegistrationData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  description?: string;
}

interface ICreateUser {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  description?: string;
}
