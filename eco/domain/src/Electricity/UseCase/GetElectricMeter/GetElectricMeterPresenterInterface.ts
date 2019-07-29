import { GetElectricMeterResponse } from './GetElectricMeterResponse';

export interface GetElectricMeterPresenterInterface {
  presentGetElectricMeter(response: GetElectricMeterResponse): void;
}
