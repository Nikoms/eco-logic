import { AddWaterMeterResponse } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterResponse';

export interface AddWaterMeterPresenterInterface {
  presentAddWaterMeter(response: AddWaterMeterResponse): void;
}
