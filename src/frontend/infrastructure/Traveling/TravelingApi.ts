import {
  AddCarPresenterInterface,
  AddCarRequest,
  AddCarResponse,
  AddFlightPresenterInterface,
  AddFlightRequest,
  AddFlightResponse,
  Car,
  GetCarPresenterInterface,
  GetCarRequest,
  GetCarResponse,
  GetCarsPresenterInterface,
  GetCarsResponse,
  GetFlightsPresenterInterface,
  GetFlightsResponse,
  PlaneTravel,
  UpdateCarPresenterInterface,
  UpdateCarRequest,
  UpdateCarResponse,
  UpdateOdometerPresenterInterface,
  UpdateOdometerResponse,
} from '../../../eco/domain';
import { addCar, addFlight, getCar, getCars, getFlights, updateCar } from '../../../infrastructure';

export class TravelingApi
  implements UpdateOdometerPresenterInterface,
    GetCarsPresenterInterface,
    AddCarPresenterInterface,
    AddFlightPresenterInterface,
    GetCarsPresenterInterface,
    GetFlightsPresenterInterface,
    GetCarPresenterInterface,
    UpdateCarPresenterInterface {
  addCarResponse?: AddCarResponse;
  addFlightResponse?: AddFlightResponse;
  getCarsResponse?: GetCarsResponse;
  getFlightsResponse?: GetFlightsResponse;
  updateOdometerResponse?: UpdateOdometerResponse;
  getCarResponse?: GetCarResponse;

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

  async getCar(carId: string): Promise<Car | undefined> {
    await getCar.execute(new GetCarRequest(carId), this);
    return this.getCarResponse!.car;
  }

  presentGetCar(response: GetCarResponse): void {
    this.getCarResponse = response;
  }

  async updateCar(car: Car) {
    await updateCar.execute(new UpdateCarRequest(car), this);
  }

  presentUpdateCar(_response: UpdateCarResponse): void {

  }
}
