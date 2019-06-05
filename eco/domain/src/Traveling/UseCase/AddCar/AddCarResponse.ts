import { Car } from '@eco/core-travel/src/entity/Car';

export class AddCarResponse {
  isNameEmpty: boolean = false;
  isConsumptionInvalid: boolean = false;
  isKmInvalid: boolean = false;
  isEngineInvalid: boolean = false;
  newCar?: Car;
}
