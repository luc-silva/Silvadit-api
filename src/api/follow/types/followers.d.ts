interface ILessDetailedUserData {
  username: string;
  user_id: string;
}

interface ICompleteUser {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  country: string;
  state: string;
  email: string;
}

type UserID = Branded<string, 'userId'>;

type ValidatedUserEmail = Branded<string, 'email'>;