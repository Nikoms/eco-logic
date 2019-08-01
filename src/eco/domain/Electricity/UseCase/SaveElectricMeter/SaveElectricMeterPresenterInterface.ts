import { SaveElectricMeterResponse } from './SaveElectricMeterResponse';

export interface SaveElectricMeterPresenterInterface {
  presentAddElectricMeterResponse(response: SaveElectricMeterResponse): void;
}
