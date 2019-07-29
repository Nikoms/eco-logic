import {
  ElectricMeter,
  GetElectricMeterPresenterInterface,
  GetElectricMeterRequest,
  GetElectricMeterResponse,
  GetElectricMetersPresenterInterface,
  GetElectricMetersResponse,
  SaveElectricMeterPresenterInterface,
  SaveElectricMeterRequest,
  SaveElectricMeterResponse,
  UpdatePowerConsumptionPresenterInterface,
  UpdatePowerConsumptionRequest,
  UpdatePowerConsumptionResponse,
} from '@eco/domain';
import {
  getElectricMeter,
  getElectricMeters,
  saveElectricMeter,
  updatePowerConsumption,
} from '@eco/infrastructure';

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

  add(meter: ElectricMeter) {
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
