import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './gql-dto/login-user.input';
import { LoginUserOutput } from './gql-dto/login-user.output';
import { MeOutput } from './gql-dto/me.output';
import { SingUpInput } from './gql-dto/sing-up.input';
import { SingUpOutput } from './gql-dto/sing-up.output';
import { JwtAuthGuard } from './guards/jwt.auth-guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SingUpOutput)
  async signup(
    @Args('signupInput') signupInput: SingUpInput,
  ): Promise<SingUpOutput> {
    return await this.authService.signUp(signupInput);
  }

  @Mutation(() => LoginUserOutput)
  async login(
    @Args('loginInput') loginInput: LoginUserInput,
  ): Promise<LoginUserOutput> {
    return await this.authService.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => MeOutput, { name: 'me' })
  async me(@Context() context: any) {
    const { username } = context.req.user;
    return {
      username,
    };
  }
}
