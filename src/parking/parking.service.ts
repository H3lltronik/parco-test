import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckInInput, CheckInOutput } from './dto/check-in';
import { CreateParkingInput } from './dto/create-parking';
import { FindAllArgs, FoundAllParkingOutput } from './dto/find-all';
import { UpdateParkingInput } from './dto/update-parking';
import { Parking } from './entities/parking.entity';
import { CheckInFactory } from './lib/checkIn';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
    private checkInFactory: CheckInFactory,
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

  async checkIn(checkInInput: CheckInInput): Promise<CheckInOutput> {
    const checkedIn = await this.checkInFactory.checkIn(
      checkInInput.parkingId,
      checkInInput.userType as any, // it comes validated from the dto
    );

    const result = new CheckInOutput();
    result.status = true;

    if (checkedIn.status === false) {
      result.status = false;
      result.errorCode = checkedIn.errorCode;
      result.message = checkedIn.message;
    }

    return result;
  }
}
