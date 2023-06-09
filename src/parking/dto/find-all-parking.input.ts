import { InputType, Int, Field } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, Max, Min } from 'class-validator';
import { UniqueName } from '../validations/uniqueName';

// Cuando se crea un nuevo estacionamiento, la request debe proporcionar:
// ● name (nombre)
// ● spots (número de cajones del estacionamiento)
// ● contact (teléfono)
// ● parkingType. Existen diferentes tipos de estacionamiento, los cuales son:
// ○ 1. public
// ○ 2. private
// ○ 3. courtes

// Además, como reglas de negocio debemos considerar
// ● Si el número de cajones de estacionamiento es menor a 50, mandar un
// error indicando que el estacionamiento es muy pequeño.
// ● Si el número de cajones del estacionamiento es mayor a 1500, mandar un
// error indicando que el estacionamiento es muy grande.
// ● El nombre no esté repetido
// Lo que se espera de este caso de uso es que se retorne del servidor un objeto
// con la información del estacionamiento y su Id único.

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
