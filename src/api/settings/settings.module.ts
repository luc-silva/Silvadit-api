import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthMiddleware } from 'src/middlewares/auth';
import { SettingsRepository } from './settings.repository';

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingsService, SettingsRepository],
})
export class SettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('cats');
  }
}
