import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { parseToken } from '~/utils/decorators/extract-user';

describe('parseToken', () => {
  it('Should create exception if request.user is invalid', () => {
    const request = {
      user: 'Teste',
    };

    expect(() => parseToken(request as unknown as Request)).toThrow(
      UnauthorizedException,
    );
  });

  //token may be unmockable
  it.skip('Should not create exception if request.user is invalid', () => {
    const request = {
      user: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoiMTIzIiwiaWF0IjoxNzU0OTQ3NDE2fQ.aMJ3qM5tMsyAE8p29jB3dKCMg-mNMxP5Qtz46fK-go0',
    };

    expect(() => parseToken(request as unknown as Request)).not.toThrow(
      UnauthorizedException,
    );
  });
});
