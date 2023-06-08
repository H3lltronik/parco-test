import { Body, Controller, Post } from '@nestjs/common';
import { CreateParkingDto } from './dtos/createParking.dto';

@Controller('parking')
export class ParkingController {
  @Post()
  create(@Body() createParkingDto: CreateParkingDto) {
    return 'This action adds a new user';
  }
}
