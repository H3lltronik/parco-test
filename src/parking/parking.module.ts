import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingResolver } from './parking.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { UniqueNameConstraint } from './validations/uniqueName';
import { CheckInFactory } from './lib/checkIn';

const parkingRepository = TypeOrmModule.forFeature([Parking]);

@Module({
  imports: [parkingRepository],
  providers: [
    ParkingResolver,
    ParkingService,
    UniqueNameConstraint,
    CheckInFactory,
  ],
})
export class ParkingModule {}
