export const createCompletedUserData = (
  data?: Partial<ICompleteUser>,
): ICompleteUser => {
  return {
    country: 'BR',
    email: 'teste@teste.com',
    first_name: 'Lucas',
    last_name: 'Silva',
    password: '123',
    state: 'SP',
    username: 'teste.teste',
    userId: 'ABCEDFGE',
    ...data,
  };
};

export const createUserOutput = (data?: Partial<IUserOutput>): IUserOutput => {
  return {
    country: 'BR',
    email: 'teste@teste.com',
    firstName: 'Lucas',
    lastName: 'Silva',
    state: 'SP',
    username: 'teste.teste',
    dateCreated: new Date('2025-08-11T18:15:00.281Z'),
    userId: 'ABCEDFGE',
    ...data,
  };
};
