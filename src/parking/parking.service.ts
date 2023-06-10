import { Injectable } from '@nestjs/common';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
import { Parking } from './entities/parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllArgs } from './dto/find-all-parking.input';
import { FoundAllParkingOutput } from './dto/found-all-parking.output';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
  ) {}

  create(createParkingInput: CreateParkingInput) {
    const newParking = this.parkingRepository.create(createParkingInput);
    return this.parkingRepository.save(newParking);
  }

  async findAll(findAllArgs: FindAllArgs): Promise<FoundAllParkingOutput> {
    const foundItems = await this.parkingRepository.find({
      skip: findAllArgs.skip,
      take: findAllArgs.limit,
    });
    const result = new FoundAllParkingOutput();
    result.totalItems = foundItems.length;
    result.data = foundItems;
    return result;
  }

  findOne(id: number) {
    return this.parkingRepository.findOne({ where: { id } });
  }

  findOneByName(name: string) {
    return this.parkingRepository.findOne({ where: { name } });
  }

  async update(
    id: number,
    updateParkingInput: UpdateParkingInput,
  ): Promise<Parking> {
    const updateResult = await this.parkingRepository.update(
      { id },
      { ...updateParkingInput, updatedAt: new Date() },
    );
    if (updateResult.affected <= 0)
      throw new Error(`Parking with id ${id} does not exist`);

    const updatedParking = await this.parkingRepository.findOne({
      where: { id },
    });
    return updatedParking;
  }

  remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
