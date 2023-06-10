import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  list = () => {
    return 'list of users';
  };

  find = (id: number) => {
    return 'find a user';
  };

  findByUsername = (username: string) => {
    return this.usersRepository.findOne({ where: { username } });
  };

  create = async (createDto: CreateUserDto) => {
    try {
      const newUser = this.usersRepository.create(createDto);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  };

  update = () => {
    return 'update a user';
  };

  delete = () => {
    return 'delete a user';
  };
}
