import { Injectable } from '@nestjs/common';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
  ) {}

  create(createParkingInput: CreateParkingInput) {
    const newParking = this.parkingRepository.create(createParkingInput);
    return this.parkingRepository.save(newParking);
  }

  findAll() {
    return this.parkingRepository.find();
  }

  findOne(id: number) {
    return this.parkingRepository.findOne({ where: { id } });
  }

  update(id: number, updateParkingInput: UpdateParkingInput) {
    return `This action updates a #${id} parking`;
  }

  remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
