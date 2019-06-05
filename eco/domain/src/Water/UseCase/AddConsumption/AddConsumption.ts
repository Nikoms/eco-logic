import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { api as defaultExport, Api } from '@eco/domain/src/Temp/Api';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';

export class AddConsumption {
  constructor(private presenter: AddConsumptionPresenterInterface, private api: Api = defaultExport) {
  }

  async execute(requests: AddConsumptionRequest[]) {
    for (const request of requests) {
      const consumptions = [];
      if (request.m3.trim().length > 0) {
        consumptions.push(await this.api.addWaterConsumption(request.meterId, parseFloat(request.m3)));
      }
      this.presenter.allConsumptionsSaved(consumptions);
    }
  }
}
