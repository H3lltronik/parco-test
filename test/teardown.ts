import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

export default async (): Promise<void> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  // await app.init();

  const usersService = app.get<UsersService>(UsersService);

  const users = await usersService.list();

  for (const user of users) {
    await usersService.delete(user.id);
  }

  await app.close();
};
