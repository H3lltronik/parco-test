import { InputType, Int, Field, ArgsType } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, Max, Min } from 'class-validator';
import { UniqueName } from '../validations/uniqueName';

// Obtener una lista de todos los estacionamientos
// registrados en la base de datos
// Se espera que los resultados se retornen paginados, con opciones de mandar los
// siguientes parámetros:
// ● skip - que permite saltar un x número de páginas
// ● limit - para limitar el número de elementos de la lista.
// ● order - para ordenar los resultados de forma ascendente o descendente (se
// debería poder ordenar por cualquier propiedad)
// Ejemplo de respuesta:
// {
// "totalItems": 1,
// "data": [
// {
// "id": "490781b9-b7ba-41f0-8153-e9b7e7b9c353"
// "name": "Plaza acueducto",
// "contact": "+523382102919",
// "spots": 420,
// "createdAt": "2023-03-21T08:00:23Z",
// "parkingType": "public"
// }
// ]
// }

@ArgsType()
export class FindAllArgs {
  @Field({ description: 'Saltar un X numero de paginas' })
  skip: number;

  @Field({
    description: 'Limitar el numero de elementos de la lista',
  })
  limit: number;

  @Field({
    description: 'Ordenar los resultados de forma ascendente o descendente',
  })
  @IsIn(['ASC', 'DESC'], {
    message: 'El orden debe ser ASC o DESC',
  })
  order: string;
}
