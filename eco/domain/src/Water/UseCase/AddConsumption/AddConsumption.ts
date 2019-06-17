import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';

export class AddConsumption {
  constructor(private repository: ConsumptionRepositoryInterface) {
  }

  async execute(request: AddConsumptionRequest, presenter: AddConsumptionPresenterInterface) {
    const response = new AddConsumptionResponse();

    const m3 = parseFloat(request.m3.trim());
    if (isNaN(m3)) {
      response.isConsumptionInvalid = true;
    } else {
      const id = request.id || await this.repository.nextIdentity();
      const date = request.date || new Date();

      const waterConsumption = new WaterConsumption(id, m3, request.meterId, date);
      await this.repository.add(waterConsumption);
      response.consumption = waterConsumption;
    }

    presenter.presentAddConsumption(response);
  }
}
