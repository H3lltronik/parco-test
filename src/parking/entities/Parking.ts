import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;
}
