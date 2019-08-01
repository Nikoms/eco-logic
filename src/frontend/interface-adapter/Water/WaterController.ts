import {
  AddConsumption,
  AddConsumptionPresenterInterface,
  AddConsumptionRequest,
  AddWaterMeter,
  AddWaterMeterPresenterInterface,
  AddWaterMeterRequest,
  GetConsumptions,
  GetConsumptionsPresenterInterface,
  GetWaterMeters,
  GetWaterMetersPresenterInterface,
} from '../../../eco/domain';

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
