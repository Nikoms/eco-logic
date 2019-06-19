import {
  addCar,
  addFlight,
  addFuelOilOrder,
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getCarbons,
  getCars,
  getFlights,
  getLastFuelOilOrder,
  getTotalFuelOilOrder,
  getWaterMeters,
} from '@eco/infrastructure/src/di';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { TravelingPresenter } from '@eco/frontend-interface-adapter/src/Traveling/TravelingPresenter';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { WaterPresenter } from '@eco/frontend-interface-adapter/src/Water/WaterPresenter';
import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterRequest';
import { HouseHeatingApiPresenter } from '@eco/frontend-infrastructure/src/HouseHeating/HouseHeatingApiPresenter';

export class Api {
  async getCars() {
    const presenter = new TravelingPresenter();
    await getCars.execute(presenter);
    return presenter.getGetCarsViewModel().cars;
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

  async addFuelOilOrder(liters: number) {
    await addFuelOilOrder.execute(new AddFuelOilOrderRequest(`${liters}`), new HouseHeatingApiPresenter());
  }

  async getLastFuelOilOrders(max: number) {
    const presenter = new HouseHeatingApiPresenter();
    await getLastFuelOilOrder.execute(new GetLastFuelOilOrdersRequest(max), presenter);
    return presenter.getLastFuelOilOrdersResponse!.lastFuelOilOrders;
  }

  async getTotalFuelOilOrder() {
    const presenter = new HouseHeatingApiPresenter();
    await getTotalFuelOilOrder.execute(presenter);
    return presenter.getTotalFuelOilOrderResponse!.totalFuelOilOrder;
  }

  getCarbons() {
    return getCarbons.execute();
  }
}

export const api = new Api();


