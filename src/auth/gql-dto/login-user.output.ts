import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserOutput {
  @Field(() => String, { description: 'Access token' })
  access_token: string;
}
