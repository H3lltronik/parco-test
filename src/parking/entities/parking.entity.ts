import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Parking {
  // @Field(() => Int, {description: 'Example field (placeholder)'})
  // exampleField: number;

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id único del estacionamiento' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Nombre del estacionamiento' })
  name: string;

  @Column()
  @Field(() => Int, { description: 'Número de cajones del estacionamiento' })
  spots: number;

  @Column()
  @Field(() => String, { description: 'Teléfono de contacto' })
  contact: string;

  @Column()
  @Field(() => String, { description: 'Tipo de estacionamiento' })
  parkingType: string;
}
