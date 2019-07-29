import { CarbonRepository } from '../../Repository/CarbonRepository';
import { GetCarbonsPresenter } from './GetCarbonsPresenter';
import { GetCarbonsResponse } from './GetCarbonsResponse';

export class GetCarbons {
  constructor(private store: CarbonRepository) {
  }

  async execute(presenter: GetCarbonsPresenter) {
    const response = new GetCarbonsResponse();
    response.carbons = await this.store.getAll();
    presenter.presentGetCarbons(response);
  }
}
