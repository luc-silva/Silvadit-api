import { JWTEncrypter } from '~/utils/Encrypter';

describe('Encrypter', () => {
  it('Should encrypt correctly', () => {
    const data = { secret: 'A Secret secret' };

    const encrypted = JWTEncrypter.encode<typeof data>(data);
    const decrypted = JWTEncrypter.decode(encrypted);

    expect(typeof encrypted).toBe('string');
    expect(decrypted).toEqual(data);
  });

  it('should throw error for invalid token', () => {
    expect(() => JWTEncrypter.decode('this_is_a_token_or_isnt_it')).toThrow();
  });
});
