// Método checkIn
// La aplicación debe de tener un caso de uso en el que permita la entrada a un
// usuario a un estacionamiento. Los parámetros serían los siguientes:
// ● parkingId
// ● userType (corporate, provider, visitor)
// La aplicación debe tener un caso de uso en el que, dependiendo el tipo de usuario
// y el estacionamiento, se ejecuten una serie de validaciones para determinar si ese
// usuario puede o no ingresar al estacionamiento. Las reglas son las siguientes:
// ● public: Para este tipo de estacionamiento no hay validaciones. Cualquier
// persona puede entrar.
// ● private: Para este tipo de estacionamiento, solo los usuarios con tipo
// corporate pueden ingresar. Además, este tipo de estacionamiento solo puede
// ser usado en días hábiles (lunes a viernes)
// ● courtesy: Para este tipo, solo están permitidos los tipo visitor y solo está
// habilitado para los fines de semana.
// Se espera de este caso de uso que retorne un status indicando el success de la
// request o un status de error, un errorCode y un mensaje indicando qué sucedió.
// Además, deberás implementar un patrón de diseño Factory para solucionar este
// problema

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from 'src/parking/entities/parking.entity';
import { Repository } from 'typeorm';

type UserType = 'corporate' | 'provider' | 'visitor';
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
type CheckInResponse =
  | {
      status: true;
    }
  | {
      status: false;
      errorCode: string;
      message: string;
    };

interface CheckInHandler {
  checkIn(userType: UserType): Promise<CheckInResponse>;
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
