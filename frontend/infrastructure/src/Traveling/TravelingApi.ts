import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { GetCarsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsPresenterInterface';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';
import { GetFlightsResponse } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsResponse';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { addCar, addFlight, getCars, getFlights } from '@eco/infrastructure/src/di';
import { AddCarRequest } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarRequest';
import { AddFlightRequest } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightRequest';

export class TravelingApi
  implements UpdateOdometerPresenterInterface,
    GetCarsPresenterInterface,
    AddCarPresenterInterface,
    AddFlightPresenterInterface,
    GetCarsPresenterInterface,
    GetFlightsPresenterInterface {
  addCarResponse?: AddCarResponse;
  addFlightResponse?: AddFlightResponse;
  getCarsResponse?: GetCarsResponse;
  getFlightsResponse?: GetFlightsResponse;
  updateOdometerResponse?: UpdateOdometerResponse;

  presentAddCar(response: AddCarResponse): void {
    this.addCarResponse = response;
  }

  presentAddFlight(response: AddFlightResponse): void {
    this.addFlightResponse = response;
  }

  presentGetCars(response: GetCarsResponse): void {
    this.getCarsResponse = response;
  }

  presentGetFlights(response: GetFlightsResponse): void {
    this.getFlightsResponse = response;
  }

  presentUpdateOdometer(response: UpdateOdometerResponse): void {
    this.updateOdometerResponse = response;
  }

  async addCar(car: Car) {
    await addCar.execute(
      new AddCarRequest(car.name, `${car.consumption}`, car.engine, `${car.km}`, car.id),
      this,
    );
  }

  async getCars(): Promise<Car[]> {
    await getCars.execute(this);
    return this.getCarsResponse!.cars;
  }

  async addPlaneTravel(flight: PlaneTravel) {
    await addFlight.execute(
      new AddFlightRequest(flight.seat, `${flight.km}`, flight.description, flight.id, flight.date),
      this,
    );
  }

  async getFlights(): Promise<PlaneTravel[]> {
    await getFlights.execute(this);
    return this.getFlightsResponse!.flights;
  }
}
