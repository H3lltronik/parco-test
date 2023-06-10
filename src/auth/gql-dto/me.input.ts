import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class MeInput {
  @IsNotEmpty()
  @Field(() => String)
  access_token: string;
}
