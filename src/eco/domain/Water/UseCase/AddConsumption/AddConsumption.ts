import { AddConsumptionRequest } from './AddConsumptionRequest';
import { ConsumptionRepositoryInterface } from '../ConsumptionRepositoryInterface';
import { AddConsumptionPresenterInterface } from './AddConsumptionPresenterInterface';
import { AddConsumptionResponse } from './AddConsumptionResponse';
import { WaterConsumption } from '../../Entity/WaterConsumption';

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
