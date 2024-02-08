import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingModule } from './scheduling/scheduling.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SchedulingModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
