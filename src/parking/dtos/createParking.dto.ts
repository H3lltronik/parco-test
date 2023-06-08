import { IsNotEmpty, IsIn, Min, Max } from 'class-validator';

// Cuando se crea un nuevo estacionamiento, la request debe proporcionar:
// ● name (nombre)
// ● spots (número de cajones del estacionamiento)
// ● contact (teléfono)
// ● parkingType. Existen diferentes tipos de estacionamiento, los cuales son:
// ○ 1. public
// ○ 2. private
// ○ 3. courtesy

// Además, como reglas de negocio debemos considerar
// ● Si el número de cajones de estacionamiento es menor a 50, mandar un
// error indicando que el estacionamiento es muy pequeño.
// ● Si el número de cajones del estacionamiento es mayor a 1500, mandar un
// error indicando que el estacionamiento es muy grande.
// ● El nombre no esté repetido
// Lo que se espera de este caso de uso es que se retorne del servidor un objeto
// con la información del estacionamiento y su Id único.

export class CreateParkingDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsNotEmpty({ message: 'La dirección es requerida' })
  @Min(50, { message: 'El estacionamiento es muy pequeño' })
  @Max(1500, { message: 'El estacionamiento es muy grande' })
  spots: number;

  @IsNotEmpty({ message: 'El contacto es requerido' })
  contact: string;

  @IsNotEmpty({ message: 'El tipo de estacionamiento es requerido' })
  @IsIn(['public', 'private', 'courtesy'])
  parkingType: string;
}
