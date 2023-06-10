import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ParkingService } from '../parking.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly parkingService: ParkingService) {}

  async validate(name: any, args: ValidationArguments) {
    const parking = await this.parkingService.findOneByName(name);

    return !parking;
  }
}

export function UniqueName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueNameConstraint,
    });
  };
}
