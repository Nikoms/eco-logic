import { GetConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptionsPresenterInterface';
import { GetConsumptionsResponse } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptionsResponse';
import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';

export class GetConsumptions {
  constructor(private repository: ConsumptionRepositoryInterface) {
  }

  async execute(presenter: GetConsumptionsPresenterInterface) {
    const response = new GetConsumptionsResponse();
    response.consumptions = await this.repository.getAll();
    presenter.presentGetConsumptionsResponse(response);
  }
}
