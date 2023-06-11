import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parking } from '../../entities/parking.entity';

enum ParkingType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  COURTESY = 'courtesy',
}
enum UserEnum {
  CORPORATE = 'corporate',
  PROVIDER = 'provider',
  VISITOR = 'visitor',
}

@Injectable()
export class CheckInFactory {
  constructor(
    @InjectRepository(Parking) private parkingRepository: Repository<Parking>,
  ) {}

  public async checkIn(
    parkingId: number,
    userType: UserType,
  ): Promise<CheckInResponse> {
    try {
      return await this._checkIn(parkingId, userType);
    } catch (error) {
      return {
        status: false,
        errorCode: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      };
    }
  }

  private async _checkIn(parkingId: number, userType: UserType) {
    const parking = await this.parkingRepository.findOne({
      where: { id: parkingId },
    });
    if (!parking)
      throw new Error(`Parking with id ${parkingId} does not exist`);

    let checkInHandler: CheckInHandler;

    switch (parking.parkingType) {
      case ParkingType.PUBLIC: {
        checkInHandler = new PublicCheckIn(parking);
        break;
      }
      case ParkingType.PRIVATE: {
        checkInHandler = new PrivateCheckIn(parking);
        break;
      }
      case ParkingType.COURTESY: {
        checkInHandler = new CourtesyCheckIn(parking);
        break;
      }
      default: {
        throw new Error(`Parking type ${parking.parkingType} does not exist`);
      }
    }

    return checkInHandler.checkIn(userType);
  }
}

class BaseCheckIn {
  protected parking: Parking;

  constructor(parking: Parking) {
    this.parking = parking;
  }
}

class PublicCheckIn extends BaseCheckIn implements CheckInHandler {
  async checkIn(userType: UserType): Promise<CheckInResponse> {
    return {
      status: true,
    };
  }
}

class PrivateCheckIn extends BaseCheckIn implements CheckInHandler {
  async checkIn(userType: UserType): Promise<CheckInResponse> {
    if (userType !== UserEnum.CORPORATE)
      return {
        status: false,
        errorCode: 'CORPORATE_USER_NOT_ALLOWED',
        message: 'Corporate users are not allowed in this parking',
      };

    if (new Date().getDay() > 5)
      return {
        status: false,
        errorCode: 'WEEKEND_NOT_ALLOWED',
        message: 'Weekend is not allowed in this parking',
      };

    return {
      status: true,
    };
  }
}

class CourtesyCheckIn extends BaseCheckIn implements CheckInHandler {
  async checkIn(userType: UserType): Promise<CheckInResponse> {
    if (userType !== UserEnum.VISITOR)
      return {
        status: false,
        errorCode: 'CORPORATE_USER_NOT_ALLOWED',
        message: 'Corporate users are not allowed in this parking',
      };

    if (new Date().getDay() < 6)
      return {
        status: false,
        errorCode: 'WEEKEND_NOT_ALLOWED',
        message: 'Weekend is not allowed in this parking',
      };

    return {
      status: true,
    };
  }
}
