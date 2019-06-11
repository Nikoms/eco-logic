import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { InitWaterMeter } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';
import { ListConsumptions } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptions';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';

export class WaterController {
  constructor(
    private addConsumptionPresenter: AddConsumptionPresenterInterface,
    private getWaterMeterPresenter: GetWaterMetersPresenterInterface,
    private listConsumptionsPresenter: ListConsumptionsPresenterInterface,
    private addConsumptionUseCase: AddConsumption,
    private initWaterMeter: InitWaterMeter,
    private getWaterMeters: GetWaterMeters,
    private listConsumptions: ListConsumptions) {

  }

  addConsumption(requests: AddConsumptionRequest[]) {
    this.addConsumptionUseCase.execute(requests, this.addConsumptionPresenter);
  }

  async initialize(request: InitWaterMeterRequest) {
    await this.initWaterMeter.execute(request, this.getWaterMeterPresenter);
  }

  async refreshSummary() {
    await this.getWaterMeters.execute(this.getWaterMeterPresenter);
  }

  refreshConsumptions() {
    this.listConsumptions.execute(this.listConsumptionsPresenter);
  }
}
