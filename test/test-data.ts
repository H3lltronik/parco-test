import { CreateUserDto } from '../src/users/dto/create.dto';

export const testPaking = {
  name: 'test 333',
  spots: 50,
  contact: 'si',
  parkingType: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const testUser: CreateUserDto = {
  password: '123456',
  username: 'test',
};
