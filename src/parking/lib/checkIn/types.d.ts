type UserType = 'corporate' | 'provider' | 'visitor';
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
