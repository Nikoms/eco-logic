import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';

export class ElectricityApiPresenter implements UpdatePowerConsumptionPresenterInterface,
  GetElectricMetersPresenterInterface,
  GetElectricMeterPresenterInterface,
  SaveElectricMeterPresenterInterface {

  public saveElectricMeterResponse?: SaveElectricMeterResponse;
  public getElectricMeterResponse?: GetElectricMeterResponse;
  public getElectricMetersResponse?: GetElectricMetersResponse;
  public updatePowerConsumptionResponse?: UpdatePowerConsumptionResponse;

  presentAddElectricMeterResponse(response: SaveElectricMeterResponse): void {
    this.saveElectricMeterResponse = response;
  }

  presentGetElectricMeter(response: GetElectricMeterResponse): void {
    this.getElectricMeterResponse = response;
  }

  presentGetElectricMeters(response: GetElectricMetersResponse): void {
    this.getElectricMetersResponse = response;
  }

  presentUpdatePowerConsumption(response: UpdatePowerConsumptionResponse): void {
    this.updatePowerConsumptionResponse = response;
  }
}
