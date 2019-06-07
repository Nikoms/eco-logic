import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { InitWaterMeter } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { ListConsumptions } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptions';

export class WaterController {
  constructor(private addConsumptionUseCase: AddConsumption,
              private initWaterMeter: InitWaterMeter,
              private getWaterMeters: GetWaterMeters,
              private listConsumptions: ListConsumptions) {

  }

  addConsumption(requests: AddConsumptionRequest[]) {
    this.addConsumptionUseCase.execute(requests);
  }

  async initialize(request: InitWaterMeterRequest) {
    await this.initWaterMeter.execute(request);
  }

  async refreshSummary() {
    await this.getWaterMeters.execute();
  }

  refreshConsumptions() {
    this.listConsumptions.execute();
  }
}
