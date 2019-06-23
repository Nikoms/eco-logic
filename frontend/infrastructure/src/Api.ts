import {
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getCarbons,
  getWaterMeters,
} from '@eco/infrastructure/src/di';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { WaterPresenter } from '@eco/frontend-interface-adapter/src/Water/WaterPresenter';
import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterRequest';

export class Api {

  async addWaterConsumption(consumption: WaterConsumption) {
    await addWaterConsumption.execute(
      new AddConsumptionRequest(consumption.waterMeterId, `${consumption.m3}`, consumption.id, consumption.date),
      new WaterPresenter(),
    );
  }

  async getAllWaterConsumptions() {
    const presenter = new WaterPresenter();
    await getAllWaterConsumptions.execute(presenter);

    return presenter.waterConsumptions;
  }

  async getWaterMeters() {
    const presenter = new WaterPresenter();
    await getWaterMeters.execute(presenter);
    return presenter.waterMeters;
  }

  addWaterMeter(meter: WaterMeter) {
    return addWaterMeter.execute(
      new AddWaterMeterRequest(meter.name, meter.id),
      new WaterPresenter(),
    );
  }

  getCarbons() {
    return getCarbons.execute();
  }
}

export const api = new Api();


