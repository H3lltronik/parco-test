import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { testUser } from '../test/test-data';

export default async (): Promise<void> => {
  console.debug('setup.ts: start');
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  const usersService = app.get<UsersService>(UsersService);
  await usersService.create(testUser);

  await app.close();
};
