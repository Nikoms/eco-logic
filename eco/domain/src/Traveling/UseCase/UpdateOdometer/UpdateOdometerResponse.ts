import { Car } from '@eco/domain/src/Traveling/Entity/Car';

export class UpdateOdometerResponse {
  isKmEmpty: boolean = false;
  isCarUnknown: boolean = false;
  isKmInvalid: boolean = false;
  updatedCar?: Car;
}
