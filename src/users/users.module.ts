import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const usersRepository = TypeOrmModule.forFeature([User]);

@Module({
  providers: [UsersService],
  imports: [usersRepository],
  exports: [UsersService],
})
export class UsersModule {}
