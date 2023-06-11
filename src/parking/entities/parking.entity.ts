import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Parking {
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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { description: 'Fecha de creación' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { description: 'Fecha de actualización' })
  updatedAt: Date;
}
