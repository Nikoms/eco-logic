import {
  addCar,
  addFlight,
  addFuelOilOrder,
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getCarbons,
  getCars,
  getElectricMeter,
  getElectricMeters,
  getFlights,
  getLastFuelOilOrder,
  getTotalFuelOilOrder,
  getWaterMeters,
  saveElectricMeter,
  updatePowerConsumption,
} from '@eco/infrastructure/src/di';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { SaveElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { GetElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterRequest';
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { TravelingPresenter } from '@eco/frontend-interface-adapter/src/Traveling/TravelingPresenter';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { WaterPresenter } from '@eco/frontend-interface-adapter/src/Water/WaterPresenter';
import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterRequest';
import { ElectricityUIPresenter } from '@eco/frontend-interface-adapter/src/Electricity/ElectricityUIPresenter';
import { HouseHeatingApiPresenter } from '@eco/frontend-infrastructure/src/HouseHeating/HouseHeatingApiPresenter';
import { ElectricityApiPresenter } from '@eco/frontend-infrastructure/src/Electricity/ElectricityApiPresenter';

export class Api {
  async getCars() {
    const presenter = new TravelingPresenter();
    await getCars.execute(presenter);
    return presenter.getGetCarsViewModel().cars;
  }

  saveElectricMeter(meter: ElectricMeter) {
    return saveElectricMeter.execute(new SaveElectricMeterRequest(meter.name, meter.id), new ElectricityApiPresenter());
  }

  async getElectricMeters() {
    const presenter = new ElectricityApiPresenter();
    await getElectricMeters.execute(presenter);

    return presenter.getElectricMetersResponse!.electricMeters;
  }

  async updatePowerConsumption(electricMeter: ElectricMeter) {
    await updatePowerConsumption.execute(
      new UpdatePowerConsumptionRequest(electricMeter.id, `${electricMeter.kWh}`),
      new ElectricityUIPresenter(),
    );
  }

  async getElectricMeter(id: string) {
    const presenter = new ElectricityApiPresenter();

    await getElectricMeter.execute(new GetElectricMeterRequest(id), presenter);

    return presenter.getElectricMeterResponse!.electricMeter;
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


