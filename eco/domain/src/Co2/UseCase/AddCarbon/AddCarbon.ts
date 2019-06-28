import { CarbonRepository } from '@eco/domain/src/Co2/Repository/CarbonRepository';
import { AddCarbonRequest } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonRequest';
import { Carbon } from '@eco/domain/src/Co2/Entity/Carbon';
import { AddCarbonPresenter } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonPresenter';
import { AddCarbonResponse } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonResponse';

export class AddCarbon {
  constructor(private repository: CarbonRepository) {
  }

  async execute(request: AddCarbonRequest, presenter: AddCarbonPresenter) {
    const response = new AddCarbonResponse();
    let hasError = false;
    if (isNaN(request.kg)) {
      response.isInvalidKg = true;
      hasError = true;
    }

    if (!hasError) {
      const id = request.id || await this.repository.nextIdentity();
      const date = request.date || new Date();
      const carbon = new Carbon(id, request.kg, request.description, date);
      await this.repository.add(carbon);

      response.carbon = carbon;
    }

    presenter.presentAddCarbon(response);
  }
}
