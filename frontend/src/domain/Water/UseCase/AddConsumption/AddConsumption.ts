import { AddConsumptionPresenter } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionPresenter';
import { AddConsumptionRequest } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { api as defaultExport, Api } from '../../../../../../api/frontend/src/Api';

export class AddConsumption {
  constructor(private presenter: AddConsumptionPresenter, private api: Api = defaultExport) {

  }

  async execute(requests: AddConsumptionRequest[]) {
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      const consumptions = [];
      if (request.m3.trim().length > 0) {
        consumptions.push(await this.api.addWaterConsumption(request.meterId, parseFloat(request.m3)));
      }
      this.presenter.allConsumptionsSaved(consumptions);
    }
  }
}
