import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Parking } from 'src/parking/entities/parking.entity';

@ObjectType()
export class FoundAllParkingOutput {
  @Field(() => Int, { description: 'Número de estacionamientos' })
  totalItems: number;

  @Field(() => [Parking], {
    description: 'Lista de estacionamientos',
    nullable: true,
  })
  data: Parking[];
}
