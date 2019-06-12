import { AddWaterMeterResponse } from '@eco/domain/src/Water/UseCase/InitWaterMeter/AddWaterMeterResponse';

export interface AddWaterMeterPresenterInterface {
  presentAddWaterMeter(response: AddWaterMeterResponse): void;
}
