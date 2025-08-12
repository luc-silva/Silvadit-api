import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { AuthService } from '~/api/auth/auth.service';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserLoginDTO,
} from '~/api/auth/types/auth.dto';
import { AuthValidator } from '~/api/auth/utils/Auth.validator';
import { TestingModule, Test } from '@nestjs/testing';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';
import { createCompletedUserData, createUserOutput } from 'test/mock/data/user';
import { AuthMapper } from '~/api/auth/utils/auth.mapper';
import {
  ICreateUserParams,
  IUpdateUserParams,
} from '~/api/user/repository/user.interface';

describe('authService', () => {
  let authService: AuthService;
  let userRepository: MockUserRepository;

  beforeEach(async () => {
    userRepository = new MockUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    })
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Validator', () => {
    it('Should validate email correctly', () => {
      const email = 'teste';

      expect(() => AuthValidator.checkEmail(email)).toThrow(
        Error('Invalid email pattern'),
      );
    });

    it('Should validate email correctly', () => {
      const email = 'teste@teste.com';

      expect(() => AuthValidator.checkEmail(email)).not.toThrow(
        Error('Invalid email pattern'),
      );
    });

    it('Should throw exception if passwords are different', () => {
      const data = {
        password: 'Teste',
        confirmPassword: '123',
      } as CreateUserDTO;

      expect(() => AuthValidator.checkPasswords(data)).toThrow(
        Error('Invalid Password. Passwords are not equal.'),
      );
    });

    it('Should not throw exception if passwords are different', () => {
      const data = {
        password: 'Teste',
        confirmPassword: 'Teste',
      } as CreateUserDTO;

      expect(() => AuthValidator.checkPasswords(data)).not.toThrow(
        Error('Invalid Password. Passwords are not equal.'),
      );
    });
  });

  describe('Mapper', () => {
    it('Should map session correctly', () => {
      const mockedExpectedResult: ISession = {
        id: '123',
        date_issued: new Date(),
        email: 'teste@teste',
      };
      const mapped = AuthMapper.toSession(
        createCompletedUserData({ userId: '123', email: 'teste@teste' }),
      );

      expect(mapped).toEqual(mockedExpectedResult);
    });

    it('Should map login details correctly', () => {
      const mockedExpectedResult: ILoginDetails = {
        id: '123',
        token: '123',
      };
      const mapped = AuthMapper.toLoginDetails(
        createCompletedUserData({ userId: '123', email: 'teste@teste' }),
        '123',
      );

      expect(mapped).toEqual(mockedExpectedResult);
    });

    it('Should map update correctly', () => {
      const mockedExpectedResult: IUpdateUserParams = {
        country: 'BR',
        description: 'Lorem lorem',
        first_name: 'Teste',
        last_name: 'Santos',
        state: 'SP',
      };

      const value: UpdateUserDTO = {
        country: 'BR',
        description: 'Lorem lorem',
        firstName: 'Teste',
        lastName: 'Santos',
        state: 'SP',
        email: 'teste@teste',
        newEmail: 'teste2@teste',
      };
      const mapped = AuthMapper.toUpdate(value);

      expect(mapped).toEqual(mockedExpectedResult);
    });

    it('Should map create correctly', () => {
      const mockedExpectedResult: ICreateUserParams = {
        country: 'BR',
        description: 'Lorem lorem',
        first_name: 'Teste',
        last_name: 'Santos',
        state: 'SP',
        email: 'teste@teste',
        password: '123',
        username: 'teste_123',
      };

      const value: CreateUserDTO = {
        country: 'BR',
        description: 'Lorem lorem',
        firstName: 'Teste',
        lastName: 'Santos',
        state: 'SP',
        email: 'teste@teste',
        confirmPassword: '123',
        password: '123',
        username: 'teste_123',
      };
      const mapped = AuthMapper.toCreate(value);

      expect(mapped).toEqual(mockedExpectedResult);
    });
  });

  describe('POST - createUser', () => {
    it('Should throw error if user submit invalid email', async () => {
      const mock: CreateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE',
        firstName: 'Teste',
        lastName: 'Da Silva',
        password: '123',
        confirmPassword: '123',
        state: 'BR',
        username: 'testinho',
        description: '',
      };

      await expect(authService.createUser(mock)).rejects.toThrow(
        'Invalid email pattern',
      );
    });

    it('should create exception if user tries to create an account with a registered email', async () => {
      const mock: CreateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE.com.br',
        firstName: 'Teste',
        lastName: 'Da Silva',
        password: '123',
        confirmPassword: '123',
        state: 'BR',
        username: 'testinho',
        description: 'teste',
      };

      const mockResult: ICompleteUser = createCompletedUserData();

      userRepository.getUserByLogin.mockResolvedValue(mockResult);

      await expect(authService.createUser(mock)).rejects.toThrow(
        'There is already an account using this email',
      );
    });

    it('should create exception if user tries to create an account with a registered username', async () => {
      const mock: CreateUserDTO = {
        country: 'TESTE_BR',
        email: 'email@email.com.br',
        firstName: 'Teste',
        lastName: 'Da Silva',
        password: '123',
        confirmPassword: '123',
        state: 'BR',
        username: 'testinho',
        description: 'teste',
      };

      const mockResult: ICompleteUser = createCompletedUserData();

      userRepository.getUserByLogin
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockResult);

      await expect(authService.createUser(mock)).rejects.toThrow(
        'There is already an account using this username',
      );
    });

    it('should create exception if user create account with different passwords', async () => {
      const mock: CreateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE.com.br',
        firstName: 'Teste',
        lastName: 'Da Silva',
        password: '123',
        confirmPassword: '456',
        state: 'BR',
        username: 'testinho',
        description: 'teste',
      };

      userRepository.getUserDataByEmail.mockResolvedValue(null);

      await expect(authService.createUser(mock)).rejects.toThrow(
        'Invalid Password. Passwords are not equal.',
      );
    });

    it('should create user correctly', async () => {
      const mock: CreateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE.com.br',
        firstName: 'Teste',
        lastName: 'Da Silva',
        password: '123',
        confirmPassword: '123',
        state: 'BR',
        username: 'testinho',
        description: 'teste',
      };

      userRepository.getUserDataByEmail.mockResolvedValue(null);

      await expect(authService.createUser(mock)).resolves.not.toThrow(
        'There is already an account using this email',
      );
    });
  });

  describe('PUT - updateUser', () => {
    it('Should throw error if user submit invalid email', async () => {
      const mock: UpdateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE.com',
        newEmail: 'novo',
        firstName: 'Teste',
        lastName: 'Da Silva',
        state: 'BR',
        description: '',
      };

      await expect(authService.updateUser(mock)).rejects.toThrow(
        'Invalid email pattern',
      );
    });

    it('should create exception if user tries to update an account with a registered email', async () => {
      const mock: UpdateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE.com',
        newEmail: 'novo@email.com',
        firstName: 'Teste',
        lastName: 'Da Silva',
        state: 'BR',
        description: '',
      };
      const mockResult: ICompleteUser = createCompletedUserData();

      userRepository.getUserDataByEmail.mockResolvedValue(mockResult);

      await expect(authService.updateUser(mock)).rejects.toThrow(
        'There is already an account using this email',
      );
    });

    it('should not create exception if user tries to update an account with a not registered email', async () => {
      const mock: UpdateUserDTO = {
        country: 'TESTE_BR',
        email: 'EMAIL@TESTE.com',
        newEmail: 'novo@email.com',
        firstName: 'Teste',
        lastName: 'Da Silva',
        state: 'BR',
        description: '',
      };

      userRepository.getUserDataByEmail.mockResolvedValue(null);

      await expect(authService.updateUser(mock)).resolves.not.toThrow(
        'There is already an account using this email',
      );
    });
  });

  describe('POST - login', () => {
    it('Should throw error if theres no account registered with login method', async () => {
      const mock: UserLoginDTO = {
        login: 'EMAIL@TESTE',
        password: '123',
      };

      userRepository.getUserByLogin.mockResolvedValue(null);
      await expect(authService.login(mock)).rejects.toThrow(
        'There is no account registered with that email or username',
      );
    });

    it('Should throw error if password is not correct', async () => {
      const mock: UserLoginDTO = {
        login: 'teste@teste.com',
        password: '1235',
      };

      const mockresult: ICompleteUser = createCompletedUserData();

      userRepository.getUserByLogin.mockResolvedValue(mockresult);

      await expect(authService.login(mock)).rejects.toThrow('Invalid password');
    });

    it('Should not throw error if credential is correct', async () => {
      const mock: UserLoginDTO = {
        login: 'teste@teste.com',
        password: '123',
      };

      const mockresult: ICompleteUser = createCompletedUserData();

      userRepository.getUserByLogin.mockResolvedValue(mockresult);

      await expect(authService.login(mock)).resolves.not.toThrow(
        'Invalid password',
      );
    });
  });
});
