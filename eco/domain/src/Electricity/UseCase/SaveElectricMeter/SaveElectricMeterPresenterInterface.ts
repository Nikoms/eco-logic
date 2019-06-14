import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';

export interface SaveElectricMeterPresenterInterface {
  presentAddElectricMeterResponse(response: SaveElectricMeterResponse): void;
}
