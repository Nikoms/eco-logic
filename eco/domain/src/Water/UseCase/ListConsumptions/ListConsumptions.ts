import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';
import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';

export class ListConsumptions {
  constructor(private repository: ConsumptionRepositoryInterface) {
  }

  async execute(presenter: ListConsumptionsPresenterInterface) {
    const response = new ListConsumptionsResponse();
    response.consumptions = await this.repository.getAll();
    presenter.presentListConsumptionsResponse(response);
  }
}
