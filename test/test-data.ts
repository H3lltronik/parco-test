import { Parking } from '../src/parking/entities/parking.entity';
import { CreateUserDto } from '../src/users/dto/create.dto';

export const testPaking: Parking = {
  id: 1,
  name: 'test',
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
