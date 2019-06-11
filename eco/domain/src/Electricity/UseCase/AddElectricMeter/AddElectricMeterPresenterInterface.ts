import { AddElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterResponse';

export interface AddElectricMeterPresenterInterface {
  presentAddElectricMeterResponse(response: AddElectricMeterResponse): void;
}
