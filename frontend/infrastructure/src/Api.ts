import {
  addCar,
  addFlight,
  addFuelOilOrder,
  addWaterConsumption,
  getAllWaterConsumptions,
  getCarbons,
  getCars,
  getElectricMeter,
  getElectricMeters,
  getFlights,
  getLastFuelOilOrder,
  getTotalFuelOilOrder,
  getWaterMeters,
  initWaterMeter,
  saveElectricMeter,
  updateOdometer,
  updatePowerConsumption,
} from '@eco/infrastructure/src/di';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { AddWaterConsumptionRequest } from '@eco/core-water/src/use-case/AddWaterConsumption';
import { InitWaterMeterRequest } from '@eco/core-water/src/use-case/InitWaterMeter';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { Odometer } from '@eco/domain/src/Traveling/Entity/Odometer';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
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
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { HouseHeatingPresenter } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingPresenter';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { TravelingPresenter } from '@eco/frontend-interface-adapter/src/Traveling/TravelingPresenter';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';

export class Api {
  async getCars() {
    const presenter = new TravelingPresenter();
    await getCars.execute(presenter);
    return presenter.getGetCarsViewModel().cars;
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

  async updatePowerConsumption(electricMeter: ElectricMeter) {
    const presenter = new (class ApiPresenter implements UpdatePowerConsumptionPresenterInterface {
      getUpdatePowerConsumptionViewModel(): UpdatePowerConsumptionViewModel {
        return new UpdatePowerConsumptionViewModel();
      }

      presentUpdatePowerConsumption(_response: UpdatePowerConsumptionResponse): void {
      }
    })();
    await updatePowerConsumption.execute(
      new UpdatePowerConsumptionRequest(electricMeter.id, `${electricMeter.kWh}`),
      presenter,
    );
  }

  async addCar(car: Car) {
    await addCar.execute(
      new AddCarRequest(car.name, `${car.consumption}`, car.engine, `${car.km}`, car.id),
      new TravelingPresenter(),
    );
  }

  addPlaneTravel(flight: PlaneTravel) {
    return addFlight.execute(
      new AddFlightRequest(flight.seat, `${flight.km}`, flight.description, flight.id, flight.date),
      new TravelingPresenter(),
    );
  }

  async getFlights() {
    const presenter = new TravelingPresenter();
    await getFlights.execute(presenter);
    return presenter.getFlights();
  }

  updateOdometer(odometer: Odometer) {
    return updateOdometer.execute(
      new UpdateOdometerRequest(odometer.carId, `${odometer.km}`),
      new TravelingPresenter(),
    );
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

  async addFuelOilOrder(liters: number) {
    const presenter = new HouseHeatingPresenter();

    await addFuelOilOrder.execute(new AddFuelOilOrderRequest(`${liters}`), presenter);
  }

  async getLastFuelOilOrders(max: number) {
    const presenter = new HouseHeatingPresenter();
    await getLastFuelOilOrder.execute(new GetLastFuelOilOrdersRequest(max), presenter);
    return presenter.getGetLastFuelOilOrdersViewModel().lastOrders;
  }

  async getTotalFuelOilOrder() {
    const presenter = new HouseHeatingPresenter();
    await getTotalFuelOilOrder.execute(presenter);
    return presenter.getGetTotalFuelOilOrderViewModel().totalFuelOilOrder;
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


