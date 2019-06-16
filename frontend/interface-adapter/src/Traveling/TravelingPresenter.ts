import { HomeViewModel } from '@eco/domain/src/Traveling/UseCase/Home/HomeViewModel';
import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import {
  UpdateOdometerCarViewModel,
  UpdateOdometerViewModel,
} from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddCarViewModel } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarViewModel';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightViewModel } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightViewModel';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
import { GetCarsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsPresenterInterface';
import { TravelingUI } from '@eco/frontend-interface-adapter/src/Traveling/TravelingUI';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export class TravelingPresenter
  implements UpdateOdometerPresenterInterface,
    GetCarsPresenterInterface,
    AddCarPresenterInterface,
    AddFlightPresenterInterface,
    GetCarsPresenterInterface,
    GetFlightsPresenterInterface,
    TravelingUI {

  private homeViewModel = new HomeViewModel();
  private cars: Car[] = [];
  private flights: PlaneTravel[] = [];
  private updateOdometerViewModel = new UpdateOdometerViewModel();
  private addCarViewModel = new AddCarViewModel();
  private addFlightViewModel = new AddFlightViewModel();

  constructor() {
  }

  getFlights() {
    return this.flights.slice();
  }

  // HomePresenterInterface:begin

  getGetCarsViewModel() {
    return this.homeViewModel;
  }

  presentGetCars(response: GetCarsResponse): void {
    this.cars = response.cars;
    this.updateCarViewModel();
  }

  presentGetFlights(flights: PlaneTravel[]): void {
    this.flights = flights;
    this.updateFlightViewModel();
  }

  // HomePresenterInterface:end

  // UpdateOdometerPresenterInterface:begin

  showUpdateOdometer(selectedCar: UpdateOdometerCarViewModel) {
    this.updateOdometerViewModel.displayed = true;
    this.updateOdometerViewModel.carName = selectedCar.name;
    this.updateOdometerViewModel.lastKm = selectedCar.km;
    this.updateOdometerViewModel.carId = selectedCar.id;
  }

  getUpdateOdometerViewModel(): UpdateOdometerViewModel {
    return this.updateOdometerViewModel;
  }

  hideUpdateOdometer(): any {
    this.updateOdometerViewModel.displayed = false;
  }

  presentUpdateOdometer(response: UpdateOdometerResponse): void {
    if (response.isCarUnknown) {
      console.error('isCarEmpty');
    }
    if (response.isKmEmpty) {
      console.error('isKmEmpty');
    }
    if (response.isKmInvalid) {
      console.error('isKmInvalid');
    }
    if (response.updatedCar !== undefined) {
      const updatedCar = response.updatedCar;
      const index = this.cars.findIndex(car => car.id === updatedCar.id);
      if (index > -1) {
        this.cars[index] = updatedCar;
      }
      this.updateCarViewModel();
      this.updateOdometerViewModel.displayed = false;
    }
  }

  // UpdateOdometerPresenterInterface:end

  // AddCarPresenterInterface:begin

  hideAddCar(): void {
    this.addCarViewModel.displayed = false;
  }

  getAddCarViewModel(): AddCarViewModel {
    return this.addCarViewModel;
  }

  showAddCar(): void {
    this.addCarViewModel.displayed = true;
  }

  presentAddCar(response: AddCarResponse): void {
    if (response.isConsumptionInvalid) {
      console.error('isConsumptionInvalid');
    }
    if (response.isEngineInvalid) {
      console.error('isEngineInvalid');
    }
    if (response.isKmInvalid) {
      console.error('isKmInvalid');
    }
    if (response.isNameEmpty) {
      console.error('isNameEmpty');
    }
    if (response.newCar !== undefined) {
      this.cars.push(response.newCar);
      this.updateCarViewModel();
      this.addCarViewModel.displayed = false;
    }
  }

  // AddCarPresenterInterface:end

  // AddFlightPresenterInterface:begin
  cancelAddFlight(): void {
    this.addFlightViewModel.displayed = false;
  }

  getAddFlightViewModel(): AddFlightViewModel {
    return this.addFlightViewModel;
  }

  showAddFlight(): void {
    this.addFlightViewModel.displayed = true;
  }

  presentAddFlight(response: AddFlightResponse): void {
    if (response.isInvalidKm) {
      console.error('invalid km');
    }
    if (response.isInvalidSeat) {
      console.error('invalid seat');
    }
    if (response.newFlight !== undefined) {
      this.flights.push(response.newFlight);
      this.updateFlightViewModel();
      this.addFlightViewModel.displayed = false;
    }
  }

  // AddFlightPresenterInterface:end

  // PRIVATE...
  private updateCarViewModel() {
    this.homeViewModel.cars = this.cars
      .slice()
      .reverse();
  }

  private updateFlightViewModel() {
    this.homeViewModel.flights = this.flights
      .slice()
      .reverse();
  }
}
