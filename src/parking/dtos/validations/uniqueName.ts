import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parking } from 'src/parking/entities/Parking';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Parking)
    private readonly yourEntityRepository: Repository<Parking>,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const entity = await this.yourEntityRepository.findOne({
      where: { [relatedPropertyName]: value },
    });
    return !entity; // Returns true if the value is unique (i.e., no entity with the same value exists)
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} must be unique.`;
  }
}

export function IsUnique(
  relatedPropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [relatedPropertyName],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
