import { Max, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateParkingInput } from '../create-parking/create-parking.input';

@InputType()
export class UpdateParkingInput extends PartialType(CreateParkingInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Teléfono de contacto' })
  contact?: string;

  @Field(() => Int, { description: 'Número de cajones del estacionamiento' })
  @Max(1500, { message: 'El estacionamiento es muy grande' })
  @Min(50, { message: 'El estacionamiento es muy pequeño' })
  spots?: number;
}
