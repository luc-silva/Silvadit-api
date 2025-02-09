import { Module } from '@nestjs/common';
import { CommentaryModule } from './commentary/commentary.module';
import { ForumModule } from './forum/forum.module';
import { PostModule } from './post/post.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommentaryModule,
    ForumModule,
    PostModule,
    SettingsModule,
    UserModule,
  ],
})
export class AppModule {}
