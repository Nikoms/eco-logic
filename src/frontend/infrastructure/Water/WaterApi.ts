import {
  AddConsumptionPresenterInterface,
  AddConsumptionRequest,
  AddConsumptionResponse,
  AddWaterMeterPresenterInterface,
  AddWaterMeterRequest,
  AddWaterMeterResponse,
  GetConsumptionsPresenterInterface,
  GetConsumptionsResponse,
  GetWaterMetersPresenterInterface,
  GetWaterMetersResponse,
  WaterConsumption,
  WaterMeter,
} from '../../../eco/domain';
import {
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getWaterMeters,
} from '../../../infrastructure';

export class WaterApi implements GetWaterMetersPresenterInterface,
  AddConsumptionPresenterInterface,
  GetConsumptionsPresenterInterface,
  AddWaterMeterPresenterInterface {
  private getWaterMetersResponse?: GetWaterMetersResponse;
  private getConsumptionsResponse?: GetConsumptionsResponse;

  presentAddConsumption(_response: AddConsumptionResponse): void {
  }

  presentAddWaterMeter(_response: AddWaterMeterResponse): void {
  }

  presentGetWaterMeters(response: GetWaterMetersResponse): void {
    this.getWaterMetersResponse = response;
  }

  presentGetConsumptionsResponse(response: GetConsumptionsResponse): void {
    this.getConsumptionsResponse = response;
  }

  async addWaterConsumption(consumption: WaterConsumption) {
    await addWaterConsumption.execute(
      new AddConsumptionRequest(consumption.waterMeterId, `${consumption.m3}`, consumption.id, consumption.date),
      this,
    );
  }

  async getAllWaterConsumptions() {
    await getAllWaterConsumptions.execute(this);

    return this.getConsumptionsResponse!.consumptions;
  }

  async getWaterMeters() {
    await getWaterMeters.execute(this);
    return this.getWaterMetersResponse!.meters;
  }

  async addWaterMeter(meter: WaterMeter) {
    await addWaterMeter.execute(
      new AddWaterMeterRequest(meter.name, meter.id),
      this,
    );
  }

}
