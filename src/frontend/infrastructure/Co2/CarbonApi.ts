import {
  AddCarbonPresenter,
  AddCarbonRequest,
  AddCarbonResponse,
  Carbon,
  GetCarbonsPresenter,
  GetCarbonsResponse,
} from '../../../eco/domain';
import { addCarbon, getCarbons } from '../../../infrastructure';

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
