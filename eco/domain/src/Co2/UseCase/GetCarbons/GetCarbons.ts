import { CarbonRepository } from '@eco/domain/src/Co2/Repository/CarbonRepository';
import { GetCarbonsPresenter } from '@eco/domain/src/Co2/UseCase/GetCarbons/GetCarbonsPresenter';
import { GetCarbonsResponse } from '@eco/domain/src/Co2/UseCase/GetCarbons/GetCarbonsResponse';

export class GetCarbons {
  constructor(private store: CarbonRepository) {
  }

  async execute(presenter: GetCarbonsPresenter) {
    const response = new GetCarbonsResponse();
    response.carbons = await this.store.getAll();
    presenter.presentGetCarbons(response);
  }
}
