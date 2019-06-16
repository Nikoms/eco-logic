import { Car } from '@eco/domain/src/Traveling/Entity/Car';

export class AddCarResponse {
  isNameEmpty: boolean = false;
  isConsumptionInvalid: boolean = false;
  isKmInvalid: boolean = false;
  isEngineInvalid: boolean = false;
  newCar?: Car;
}
