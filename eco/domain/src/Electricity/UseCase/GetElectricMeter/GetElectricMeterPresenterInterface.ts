import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { GetElectricMeterViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterViewModel';

export interface GetElectricMeterPresenterInterface {
  getGetElectricMeterViewModel(): GetElectricMeterViewModel;

  presentGetElectricMeter(response: GetElectricMeterResponse): void;
}
