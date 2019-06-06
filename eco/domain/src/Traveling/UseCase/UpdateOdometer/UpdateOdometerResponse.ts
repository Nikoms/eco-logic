import { Odometer } from '@eco/core-travel/src/entity/Odometer';

export class UpdateOdometerResponse {
  isKmEmpty: boolean = false;
  isCarEmpty: boolean = false;
  isKmInvalid: boolean = false;
  updatedOdometer?: Odometer;
}
