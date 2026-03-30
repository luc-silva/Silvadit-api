import {
  createCompletedUserData,
  createtUserUpdateDetailsParams,
  createUpdateUserLocationDTO,
  createUpdateUserLocationParams,
  createUserDetailsOutput,
  createUserDetailsRaw,
  createUserUpdateDetailsDTO,
} from 'test/mock/data/user';
import { UserMapper } from '~/api/user/utils/user.mapper';

describe('mapper', () => {
  describe('toUpdateUserDetails', () => {
    it('Should mapper DTO correctly', () => {
      const dto = createUserUpdateDetailsDTO();
      const expected = createtUserUpdateDetailsParams({ id: 'ABC' });
      const user = createCompletedUserData({ userId: 'ABC' });

      const result = UserMapper.toUpdateDetailsParams(dto, user);

      expect(result).toEqual(expected);
    });

    it('Should mapper DTO correctly if description is not defined', () => {
      const dto = createUserUpdateDetailsDTO({ description: '' });
      const expected = createtUserUpdateDetailsParams({
        description: null,
        id: 'ABC',
      });
      const user = createCompletedUserData({ userId: 'ABC' });

      const result = UserMapper.toUpdateDetailsParams(dto, user);

      expect(result).toEqual(expected);
    });
  });

  describe('toUpdateUserLocation', () => {
    it('Should mapper DTO correctly', () => {
      const dto = createUpdateUserLocationDTO();
      const user = createCompletedUserData({ userId: 'ABC' });
      const expected = createUpdateUserLocationParams();

      const result = UserMapper.toUpdateLocationParams(dto, user);

      expect(result).toEqual(expected);
    });
  });

  describe('toUser', () => {
    it('Should map correctly', () => {
      const raw = createUserDetailsRaw();
      const expected = createUserDetailsOutput();

      const result = UserMapper.toUser(raw);

      expect(result).toEqual(expected);
    });
  });
});
