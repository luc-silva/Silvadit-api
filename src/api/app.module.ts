import { Module } from '@nestjs/common';
import { CommentaryModule } from './commentary/commentary.module';
import { ForumModule } from './forum/forum.module';
import { PostModule } from './post/post.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { DbTestModule } from './db-test/db-test.module';

@Module({
  imports: [
    AuthModule,
    CommentaryModule,
    ForumModule,
    PostModule,
    SettingsModule,
    UserModule,
    HomeModule,
    DbTestModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
