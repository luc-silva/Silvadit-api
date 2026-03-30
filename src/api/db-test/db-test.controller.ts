import { Controller, Get, Query } from '@nestjs/common';
import { KyselyORMOracleDatabase } from '~/db/Database';
import { OptionalAuth } from '~/utils/decorators/protect-routes/PublicDecorator';

class PaginationDTO {
  page?: number = 1;
  pageSize?: number = 10;
}

@Controller('db-test')
export class DbTestController {
  private readonly db = KyselyORMOracleDatabase.getInstance();

  @Get()
  @OptionalAuth()
  async testConnection(@Query() pagination: PaginationDTO) {
    const connection = await this.db.getConnection();

    const page = pagination.page ?? 1;
    const pageSize = pagination.pageSize ?? 10;

    const result = await connection
      .selectFrom('POSTS')
      .select('CONTENT')
      .offset((page - 1) * pageSize)
      .fetch(pageSize)
      .execute();

    return {
      success: true,
      message: 'Kysely connection working',
      data: result,
      pagination: {
        page,
        pageSize,
      },
    };
  }
}
