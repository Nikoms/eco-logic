import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';
import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';

export class AddConsumption {
  constructor(private repository: ConsumptionRepositoryInterface) {
  }

  async execute(requests: AddConsumptionRequest[], presenter: AddConsumptionPresenterInterface) {
    const response = new AddConsumptionResponse();
    const consumptions: WaterConsumption[] = [];

    for (const request of requests) {
      if (request.m3.trim().length > 0) {
        const waterConsumption = new WaterConsumption(await this.repository.nextIdentity(), parseFloat(request.m3), request.meterId, new Date());
        await this.repository.add(waterConsumption);
        consumptions.push(waterConsumption);
      }
    }
    response.consumptions = consumptions;
    presenter.presentAddConsumption(response);
  }
}
