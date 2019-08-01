import { ConsumptionRepositoryInterface } from '../ConsumptionRepositoryInterface';
import { GetConsumptionsPresenterInterface } from './GetConsumptionsPresenterInterface';
import { GetConsumptionsResponse } from './GetConsumptionsResponse';

export class GetConsumptions {
  constructor(private repository: ConsumptionRepositoryInterface) {
  }

  async execute(presenter: GetConsumptionsPresenterInterface) {
    const response = new GetConsumptionsResponse();
    response.consumptions = await this.repository.getAll();
    presenter.presentGetConsumptionsResponse(response);
  }
}
