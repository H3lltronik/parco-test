import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const jwt = JwtModule.register({
  global: true,
  secret: 'secret',
  signOptions: { expiresIn: '600s' },
});

@Module({
  imports: [UsersModule, jwt],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
