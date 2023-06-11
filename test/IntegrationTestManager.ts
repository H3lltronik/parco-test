import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { testUser } from './test-data';

export class IntegrationTestManager {
  public httpServer: any;
  public accessToken: string;

  private app: INestApplication;

  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.use(cookieParser());
    await this.app.init();
    this.httpServer = this.app.getHttpServer();

    const authService = this.app.get<AuthService>(AuthService);
    const usersService = this.app.get<UsersService>(UsersService);

    const user = await usersService.findByUsername(testUser.username);
    const loginResult = await authService.login({
      password: user.username,
      username: user.password,
    });

    this.accessToken = loginResult.access_token;
  }

  async afterAll(): Promise<void> {
    await this.app.close();
  }

  getAccessToken(): string {
    return this.accessToken;
  }
}
