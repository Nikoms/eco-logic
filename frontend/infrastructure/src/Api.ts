import {
  addCar,
  addPlaneTravel,
  addWaterConsumption,
  getAllWaterConsumptions,
  getCarbons,
  getCars,
  getElectricMeter,
  getElectricMeters,
  getLastFuelOilOrder,
  getPlaneTravels,
  getTotalFuelOilOrder,
  getWaterMeters,
  initWaterMeter,
  orderFuelOil,
  saveElectricMeter,
  updateOdometer,
  updatePowerConsumption,
} from '@eco/infrastructure/src/di';
import { AddCarRequest } from '@eco/core-travel/src/use-case/AddCar';
import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { AddPlaneTravelRequest } from '@eco/core-travel/src/use-case/AddPlaneTravel';
import { UpdateOdometerRequest } from '@eco/core-travel/src/use-case/UpdateOdometer';
import { AddWaterConsumptionRequest } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { InitWaterMeterRequest } from '@eco/core-water/src/use-case/InitWaterMeter';
import { Car } from '@eco/core-travel/src/entity/Car';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { Odometer } from '@eco/core-travel/src/entity/Odometer';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { PowerConsumption } from '@eco/domain/src/Electricity/Entity/PowerConsumption';
import { SaveElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { GetElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterRequest';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { GetElectricMeterViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterViewModel';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';

export class Api {
  getCars() {
    return getCars.execute();
  }

  saveElectricMeter(meter: ElectricMeter) {
    const presenter = new (class ApiPresenter implements SaveElectricMeterPresenterInterface {
      presentAddElectricMeterResponse(_response: SaveElectricMeterResponse): void {
      }
    })();

    return saveElectricMeter.execute(new SaveElectricMeterRequest(meter.name, meter.id), presenter);
  }

  async getElectricMeters() {
    const presenter = new (class ApiPresenter implements GetElectricMetersPresenterInterface {
      private viewModel = new GetElectricMetersViewModel();

      getGetElectricMetersViewModel(): GetElectricMetersViewModel {
        return this.viewModel;
      }

      presentGetElectricMeters(response: GetElectricMetersResponse): void {
        this.viewModel.meters = response.electricMeters;
        this.viewModel.hasMeter = this.viewModel.meters.length > 0;
      }
    })();

    await getElectricMeters.execute(presenter);

    return presenter.getGetElectricMetersViewModel().meters;
  }

  async addPowerConsumption(powerConsumption: PowerConsumption) {
    const presenter = new (class ApiPresenter implements UpdatePowerConsumptionPresenterInterface {
      cancelUpdatePowerConsumption(): void {
        // Mhhh... La preuve qu'il faut uniquement un "present" dans l'interface. Le reste c'est pour la vue "js"
      }

      getUpdatePowerConsumptionViewModel(): UpdatePowerConsumptionViewModel {
        return new UpdatePowerConsumptionViewModel();
      }

      presentUpdatePowerConsumption(_response: UpdatePowerConsumptionResponse): void {
      }
    })();
    await updatePowerConsumption.execute(
      new UpdatePowerConsumptionRequest(powerConsumption.electricMeterId, `${powerConsumption.kWh}`),
      presenter,
    );
  }

  addCar(car: Car) {
    return addCar.execute(new AddCarRequest(car.id, car.name, car.consumption, car.engine, car.km, car.lastKmUpdate));
  }

  addPlaneTravel(flight: PlaneTravel) {
    return addPlaneTravel.execute(new AddPlaneTravelRequest(flight.id, flight.seat, flight.km, flight.description, flight.date));
  }

  getPlaneTravels() {
    return getPlaneTravels.execute();
  }

  updateOdometer(odometer: Odometer) {
    return updateOdometer.execute(new UpdateOdometerRequest(odometer.id, odometer.carId, odometer.km, odometer.date));
  }

  addWaterConsumption(consumption: WaterConsumption) {
    return addWaterConsumption.execute(
      new AddWaterConsumptionRequest(consumption.id, consumption.m3, consumption.waterMeter, consumption.date),
    );
  }

  getWaterMeters() {
    return getWaterMeters.execute();
  }

  initWaterMeter(meter: WaterMeter) {
    return initWaterMeter.execute(new InitWaterMeterRequest(meter.id, meter.name));
  }

  getAllWaterConsumptions() {
    return getAllWaterConsumptions.execute();
  }

  orderFuelOil(liters: number) {
    return orderFuelOil.execute(liters);
  }

  getLastFuelOilOrders() {
    return getLastFuelOilOrder.execute();
  }

  getTotalFuelOilOrder() {
    return getTotalFuelOilOrder.execute();
  }

  getCarbons() {
    return getCarbons.execute();
  }

  async getElectricMeter(id: string) {
    const presenter = new (class ApiPresenter implements GetElectricMeterPresenterInterface {
      public viewModel = new GetElectricMeterViewModel();

      getGetElectricMeterViewModel(): GetElectricMeterViewModel {
        return this.viewModel;
      }

      presentGetElectricMeter(response: GetElectricMeterResponse): void {
        this.viewModel.meter = response.electricMeter;
      }
    })();

    await getElectricMeter.execute(new GetElectricMeterRequest(id), presenter);

    return presenter.getGetElectricMeterViewModel().meter;
  }
}

export const api = new Api();


