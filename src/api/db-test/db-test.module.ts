import { Module } from '@nestjs/common';
import { DbTestController } from './db-test.controller';

@Module({
  controllers: [DbTestController],
})
export class DbTestModule {}
