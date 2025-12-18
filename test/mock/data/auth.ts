import { UpdateUserEmailDTO } from '~/api/auth/types/auth.dto';

export const createSessionMock = (data?: Partial<ISession>): ISession => {
  return {
    date_issued: new Date(),
    email: 'Teste@teste.com',
    id: '123',
    expiration: '7d',
    ...data,
  };
};

export const createUpdateUserEmailDTO = (
  data?: Partial<UpdateUserEmailDTO>,
): UpdateUserEmailDTO => {
  return {
    email: 'teste@teste.com',
    newEmail: 'teste@novoteste.com',
    ...data,
  };
};
