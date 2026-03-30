import { UserMapper } from './user.mapper';

export class UserAssembler {
  static assemble(rawDetails: IUserDetailsRaw) {
    const mappedDetails = UserMapper.toUser(rawDetails);

    return { user: mappedDetails };
  }
}
