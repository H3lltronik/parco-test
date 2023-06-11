import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

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
  order: 'ASC' | 'DESC';
}
