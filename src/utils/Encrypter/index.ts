import * as JWT from 'jsonwebtoken';

type IDefaultDecodeReturn<T> = {
  iat: number;
  exp: number;
} & T;

export class JWTEncrypter {
  static encode<T extends object = any>(data: T): string {
    return JWT.sign(data, '123', { expiresIn: '7d' });
  }

  static decode<T = any>(data: string): T {
    const { iat, exp, ...rest } = JWT.verify(
      data,
      '123',
    ) as IDefaultDecodeReturn<T>;
    return rest as T;
  }
}
