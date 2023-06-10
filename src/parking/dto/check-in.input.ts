import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty } from 'class-validator';

@InputType()
export class CheckInInput {
  @IsNotEmpty({ message: '' })
  @Field(() => Int, { description: '' })
  parkingId: number;

  @IsNotEmpty({ message: '' })
  @IsIn(['corporate', 'provider', 'visitor'], {
    message: 'El tipo de usuario debe ser corporate, provider o visitor',
  })
  @Field(() => String, { description: '' })
  userType: string;
}
