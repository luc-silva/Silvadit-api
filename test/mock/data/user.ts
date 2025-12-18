import {
  IUpdateUserDetailsParams,
  IUpdateUserLocationParams,
} from '~/api/user/repository/user.interface';
import {
  UpdateUserDetailsDTO,
  UpdateUserLocationDTO,
} from '~/api/user/types/user.dto';

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

export const createUserUpdateDetailsDTO = (
  data?: Partial<UpdateUserDetailsDTO>,
): UpdateUserDetailsDTO => {
  return {
    description: 'Lorem teste',
    firstName: 'Teste',
    lastName: '123',
    username: 'Teste123',
    ...data,
  };
};

export const createtUserUpdateDetailsParams = (
  data?: Partial<IUpdateUserDetailsParams>,
): IUpdateUserDetailsParams => {
  return {
    first_name: 'Teste',
    last_name: '123',
    username: 'Teste123',
    description: 'Lorem teste',
    user_id: 'ABC',
    ...data,
  };
};

export const createUpdateUserLocationDTO = (
  data?: Partial<UpdateUserLocationDTO>,
): UpdateUserLocationDTO => {
  return {
    country: 'Brazil',
    state: 'São Paulo',
    ...data,
  };
};

export const createUpdateUserLocationParams = (
  data?: Partial<IUpdateUserLocationParams>,
): IUpdateUserLocationParams => {
  return {
    country: 'Brazil',
    state: 'São Paulo',
    user_id: 'ABC',
    ...data,
  };
};
