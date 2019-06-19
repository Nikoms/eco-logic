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
  updateOdometer,
  updatePowerConsumption,
} from '@eco/infrastructure/src/di';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { Odometer } from '@eco/domain/src/Traveling/Entity/Odometer';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { SaveElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterRequest';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { UpdatePowerConsumptionRequest } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionRequest';
import { GetElectricMeterRequest } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterRequest';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { GetLastFuelOilOrdersRequest } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersRequest';
import { HouseHeatingPresenter } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingPresenter';
import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { TravelingPresenter } from '@eco/frontend-interface-adapter/src/Traveling/TravelingPresenter';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';
import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';
import { AddConsumptionRequest } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionRequest';
import { WaterPresenter } from '@eco/frontend-interface-adapter/src/Water/WaterPresenter';
import { AddWaterMeterRequest } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterRequest';
import { ElectricityPresenter } from '@eco/frontend-interface-adapter/src/Electricity/ElectricityPresenter';

export class Api {
  async getCars() {
    const presenter = new TravelingPresenter();
    await getCars.execute(presenter);
    return presenter.getGetCarsViewModel().cars;
  }

  saveElectricMeter(meter: ElectricMeter) {
    return saveElectricMeter.execute(new SaveElectricMeterRequest(meter.name, meter.id), new ElectricityPresenter());
  }

  async getElectricMeters() {
    const presenter = new (class ApiPresenter implements GetElectricMetersPresenterInterface {
      meters: ElectricMeter[] = [];

      presentGetElectricMeters(response: GetElectricMetersResponse): void {
        this.meters = response.electricMeters;
      }
    })();

    await getElectricMeters.execute(presenter);

    return presenter.meters;
  }

  async updatePowerConsumption(electricMeter: ElectricMeter) {
    await updatePowerConsumption.execute(
      new UpdatePowerConsumptionRequest(electricMeter.id, `${electricMeter.kWh}`),
      new ElectricityPresenter(),
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
    const presenter = new HouseHeatingPresenter();
    await addFuelOilOrder.execute(new AddFuelOilOrderRequest(`${liters}`), presenter);
  }

  async getLastFuelOilOrders(max: number) {
    const presenter = new HouseHeatingPresenter();
    await getLastFuelOilOrder.execute(new GetLastFuelOilOrdersRequest(max), presenter);
    return presenter.viewModel.lastOrders;
  }

  async getTotalFuelOilOrder() {
    const presenter = new HouseHeatingPresenter();
    await getTotalFuelOilOrder.execute(presenter);
    return presenter.viewModel.totalFuelOilOrder;
  }

  getCarbons() {
    return getCarbons.execute();
  }

  async getElectricMeter(id: string) {
    const presenter = new (class ApiPresenter implements GetElectricMeterPresenterInterface {
      public meter?: ElectricMeter;

      presentGetElectricMeter(response: GetElectricMeterResponse): void {
        this.meter = response.electricMeter;
      }
    })();

    await getElectricMeter.execute(new GetElectricMeterRequest(id), presenter);

    return presenter.meter;
  }
}

export const api = new Api();


