import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { AddWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { AddWaterMeterResponse } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterResponse';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import {
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getWaterMeters,
} from '@eco/infrastructure/src/di';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterRequest';

export class WaterApi implements GetWaterMetersPresenterInterface,
  AddConsumptionPresenterInterface,
  ListConsumptionsPresenterInterface,
  AddWaterMeterPresenterInterface {
  private addConsumptionResponse?: AddConsumptionResponse;
  private addWaterMeterResponse?: AddWaterMeterResponse;
  private getWaterMetersResponse?: GetWaterMetersResponse;
  private listConsumptionsResponse?: ListConsumptionsResponse;

  presentAddConsumption(response: AddConsumptionResponse): void {
    this.addConsumptionResponse = response;
  }

  presentAddWaterMeter(response: AddWaterMeterResponse): void {
    this.addWaterMeterResponse = response;
  }

  presentGetWaterMeters(response: GetWaterMetersResponse): void {
    this.getWaterMetersResponse = response;
  }

  presentListConsumptionsResponse(response: ListConsumptionsResponse): void {
    this.listConsumptionsResponse = response;
  }

  async addWaterConsumption(consumption: WaterConsumption) {
    await addWaterConsumption.execute(
      new AddConsumptionRequest(consumption.waterMeterId, `${consumption.m3}`, consumption.id, consumption.date),
      this,
    );
  }

  async getAllWaterConsumptions() {
    await getAllWaterConsumptions.execute(this);

    return this.listConsumptionsResponse!.consumptions;
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
