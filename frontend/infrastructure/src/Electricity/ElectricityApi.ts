import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import {
  getElectricMeter,
  getElectricMeters,
  saveElectricMeter,
  updatePowerConsumption,
} from '@eco/infrastructure/src/di';
import { SaveElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { GetElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterRequest';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';

export class ElectricityApi implements UpdatePowerConsumptionPresenterInterface,
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

  async getElectricMeters() {
    await getElectricMeters.execute(this);

    return this.getElectricMetersResponse!.electricMeters;
  }

  save(meter: ElectricMeter) {
    return saveElectricMeter.execute(new SaveElectricMeterRequest(meter.name, meter.id), this);
  }

  async getElectricMeter(id: string) {
    await getElectricMeter.execute(new GetElectricMeterRequest(id), this);

    return this.getElectricMeterResponse!.electricMeter;
  }

  async updatePowerConsumption(electricMeter: ElectricMeter) {
    await updatePowerConsumption.execute(
      new UpdatePowerConsumptionRequest(electricMeter.id, `${electricMeter.kWh}`),
      this,
    );

  }
}
