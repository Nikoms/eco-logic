import {
  GetElectricMetersPresenterInterface,
  GetElectricMetersResponse,
  SaveElectricMeterPresenterInterface,
  SaveElectricMeterResponse,
} from '../../../../eco/domain';

export class ElectricityPresenter implements GetElectricMetersPresenterInterface, SaveElectricMeterPresenterInterface {
  response: any;

  presentGetElectricMeters(response: GetElectricMetersResponse): void {
    this.response = response;
  }

  presentAddElectricMeterResponse(response: SaveElectricMeterResponse): void {
    this.response = response;
  }
}
