import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsIn, IsNotEmpty } from 'class-validator';

@ObjectType()
export class CheckInOutput {
  @Field(() => Boolean, { description: 'Status of the checkIn' })
  status: boolean;

  @Field(() => String, { description: 'Error code', nullable: true })
  errorCode: string;

  @Field(() => String, { description: 'Error message', nullable: true })
  message: string;
}
