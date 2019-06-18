import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';

export interface GetElectricMeterPresenterInterface {
  presentGetElectricMeter(response: GetElectricMeterResponse): void;
}
