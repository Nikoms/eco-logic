import { AddCarbonPresenter } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonPresenter';
import { AddCarbonResponse } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonResponse';
import { Carbon } from '@eco/domain/src/Co2/Entity/Carbon';
import { addCarbon, getCarbons } from '@eco/infrastructure/src/di';
import { AddCarbonRequest } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonRequest';
import { GetCarbonsPresenter } from '@eco/domain/src/Co2/UseCase/GetCarbons/GetCarbonsPresenter';
import { GetCarbonsResponse } from '@eco/domain/src/Co2/UseCase/GetCarbons/GetCarbonsResponse';

export class CarbonApi implements AddCarbonPresenter, GetCarbonsPresenter {
  private addCarbonResponse?: AddCarbonResponse;
  private getCarbonsResponse?: GetCarbonsResponse;

  presentAddCarbon(response: AddCarbonResponse) {
    this.addCarbonResponse = response;
  }

  presentGetCarbons(response: GetCarbonsResponse) {
    this.getCarbonsResponse = response;
  }


  async add(carbon: Carbon) {
    await addCarbon.execute(
      new AddCarbonRequest(carbon.kg, carbon.description, carbon.id, carbon.date),
      this,
    );

    return this.addCarbonResponse;
  }

  async getAll() {
    await getCarbons.execute(this);

    return this.getCarbonsResponse!.carbons;
  }
}
