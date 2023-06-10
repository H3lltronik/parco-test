import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeOutput {
  @Field(() => String)
  username: string;
}
