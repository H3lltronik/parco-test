import { InputType, Int, Field } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, Max, Min } from 'class-validator';
import { UniqueName } from 'src/parking/validations/uniqueName';

@InputType()
export class CreateParkingInput {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @UniqueName({ message: 'El nombre ya existe' })
  @Field(() => String, { description: 'Nombre del estacionamiento' })
  name: string;

  @IsNotEmpty({ message: 'El número de cajones es requerido' })
  @Max(1500, { message: 'El estacionamiento es muy grande' })
  @Min(50, { message: 'El estacionamiento es muy pequeño' })
  @Field(() => Int, { description: 'Número de cajones del estacionamiento' })
  spots: number;

  @IsNotEmpty({ message: 'El teléfono de contacto es requerido' })
  @Field(() => String, { description: 'Teléfono de contacto' })
  contact: string;

  @IsNotEmpty({ message: 'El tipo de estacionamiento es requerido' })
  @IsIn(['public', 'private', 'courtes'], {
    message: 'El tipo de estacionamiento debe ser public, private o courtes',
  })
  @Field(() => String, { description: 'Tipo de estacionamiento' })
  parkingType: string;
}
