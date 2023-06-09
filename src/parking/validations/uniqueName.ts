import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Parking } from '../entities/parking.entity';

@ValidatorConstraint({ async: true })
export class UniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
  ) {}

  validate(name: any, args: ValidationArguments) {
    const parkingLoader = this.parkingRepository.findOne({ where: { name } });

    return parkingLoader.then((parking) => {
      if (parking) return false;
      return true;
    });
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
