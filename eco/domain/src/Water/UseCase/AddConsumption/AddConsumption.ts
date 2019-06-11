import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { Api } from '@eco/domain/src/Temp/Api';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';

export class AddConsumption {
  constructor(private api: Api) {
  }

  async execute(requests: AddConsumptionRequest[], presenter: AddConsumptionPresenterInterface) {
    const response = new AddConsumptionResponse();
    const consumptions: WaterConsumption[] = [];

    for (const request of requests) {
      if (request.m3.trim().length > 0) {
        consumptions.push(await this.api.addWaterConsumption(request.meterId, parseFloat(request.m3)));
      }
    }
    response.consumptions = consumptions;
    presenter.presentAddConsumption(response);
  }
}
