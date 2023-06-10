import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './gql-dto/login-user.input';
import { LoginUserOutput } from './gql-dto/login-user.output';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser = async (username: string, password: string) => {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  };

  async login(loginInput: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.validateUser(
      loginInput.username,
      loginInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }

  async signUp(signupInput: LoginUserInput) {
    const newUser = await this.usersService.create(signupInput);

    return newUser;
  }
}
