import { Injectable } from '@nestjs/common';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';
import {
  PregistrerUserDTO,
  UpdatePreRegistrationUserDTO,
} from '../auth/auth.dto';
import { getConnection } from 'src/db';
import { OUT_FORMAT_OBJECT } from 'oracledb';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';

@Injectable()
export class UserRepository {
  async getUserFollowers(user_id: string) {
    const connection = await getConnection();
    connection.execute;
    const query = `
      SELECT UA.USERNAME "username", UA.USER_ID "user_id"
      FROM USER_FOLLOWERS UF, USER_ACCOUNT UA
      WHERE UF.USER_ID = UA.USER_ID(+)
        AND UF.FOLLOWING_USER = :user_id
    `;

    const { rows } = await connection.execute(query, { user_id });
    return rows && rows.length ? rows[0] : null;
  }

  async getUserFollowing() {}

  async getUserDetails() {}

  async getUserData() {}

  async createUser(data: ICreateUser) {
    const connection = await getConnection();

    const { columns, values, binds } = insertQueryHelper(
      {
        email: 'EMAIL',
        password: 'USER_PASSWORD',
        date_created: 'DATE_CREATED',
        username: 'USERNAME',
        user_id: 'USER_ID', //remover
      },
      {
        ...data,
        date_created: new Date(), //remover
        user_id: '12312',
      },
    );

    const query = `
      INSERT INTO USER_ACCOUNT (${columns})
      VALUES (${values}) 
    `;

    return await connection.execute(query, binds);
  }

  async getPreRegistrationUser({ email }: { email: string }) {
    const connection = await getConnection();

    const query = `
        SELECT 
          UPR.EMAIL "email", 
          UPR.FIRST_NAME "first_name", 
          UPR.LAST_NAME "last_name", 
          UPR.DESCRIPTION "description",
          UPR.PASSWORD "password",
          UPR.USERNAME "username"
        FROM USER_PRE_REGISTRATION UPR
        WHERE UPR.EMAIL = :email
    `;

    const { rows } = await connection.execute<IPreRegistrationData>(
      query,
      {
        email,
      },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async checkIfEmailRegistred({ email }: { email: string }) {
    const connection = await getConnection();

    const query = `
        SELECT 1 "exist"
        FROM USER_ACCOUNT UA
        WHERE UA.EMAIL = :email
    `;

    const { rows } = await connection.execute(
      query,
      { email },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async preRegisterUser(data: PregistrerUserDTO) {
    const connection = await getConnection();

    const { email, password } = data;

    const query = `
        INSERT INTO USER_PRE_REGISTRATION (EMAIL, PASSWORD, DATE_CREATED)
        VALUES (
            :email,
            :password,
            :dateCreated
        )
    `;

    return await connection.execute(query, {
      email,
      password,
      dateCreated: new Date(),
    });
  }

  async updatePreRegistrationUser(data: UpdatePreRegistrationUserDTO) {
    const connection = await getConnection();

    const { queries } = updateQueryHelper(
      {
        email: 'EMAIL',
        username: 'USERNAME',
        first_name: 'FIRST_NAME',
        last_name: 'LAST_NAME',
      },
      { ...data },
    );

    const query = `
        UPDATE USER_PRE_REGISTRATION
        SET ${queries.join(', ')}
        WHERE EMAIL = :old_email
    `;

    return await connection.execute(query, {
      ...data,
    });
  }

  async removeUserFromPreRegistration({ email }: { email: string }) {
    const connection = await getConnection();

    const query = `
      DELETE FROM USER_PRE_REGISTRATION
      WHERE EMAIL = :email
    `;

    return await connection.execute(query, { email });
  }
}
