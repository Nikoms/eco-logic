import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { AddWaterMeter } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { GetConsumptions } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptions';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { GetConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptionsPresenterInterface';
import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterRequest';
import { AddWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterPresenterInterface';

export class WaterController {
  constructor(
    private addConsumptionPresenter: AddConsumptionPresenterInterface,
    private getWaterMeterPresenter: GetWaterMetersPresenterInterface,
    private addWaterMeterPresenter: AddWaterMeterPresenterInterface,
    private getConsumptionsPresenter: GetConsumptionsPresenterInterface,
    private addConsumptionUseCase: AddConsumption,
    private addWaterMeter: AddWaterMeter,
    private getWaterMeters: GetWaterMeters,
    private getConsumptions: GetConsumptions) {

  }

  addConsumption(forms: { meterId: string, quantity: string }[]) {
    for (const form of forms) {
      this.addConsumptionUseCase.execute(
        new AddConsumptionRequest(form.meterId, form.quantity),
        this.addConsumptionPresenter,
      );
    }
  }

  async initialize(hasColdAndHotMeter: boolean) {
    const names: string[] = [];
    if (hasColdAndHotMeter) {
      names.push('Cold meter');
      names.push('Hot meter');
    } else {
      names.push('Water meter');
    }
    for (const name of names) {
      const request = new AddWaterMeterRequest(name);
      await this.addWaterMeter.execute(request, this.addWaterMeterPresenter);
    }
  }

  async refreshSummary() {
    await this.getWaterMeters.execute(this.getWaterMeterPresenter);
  }

  refreshConsumptions() {
    this.getConsumptions.execute(this.getConsumptionsPresenter);
  }
}
