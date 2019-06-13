import { Car } from '@eco/core-travel/src/entity/Car';
import { HomeViewModel } from '@eco/domain/src/Traveling/UseCase/Home/HomeViewModel';
import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import {
  UpdateOdometerCarViewModel,
  UpdateOdometerViewModel,
} from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';
import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddCarViewModel } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarViewModel';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightViewModel } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightViewModel';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';

export class TravelingPresenter
  implements UpdateOdometerPresenterInterface, HomePresenterInterface, AddCarPresenterInterface, AddFlightPresenterInterface {

  private homeViewModel = new HomeViewModel();
  private cars: Car[] = [];
  private flights: PlaneTravel[] = [];
  private updateOdometerViewModel = new UpdateOdometerViewModel();
  private addCarViewModel = new AddCarViewModel();
  private addFlightViewModel = new AddFlightViewModel();

  constructor() {
  }

  // HomePresenterInterface:begin

  getHomeViewModel() {
    return this.homeViewModel;
  }

  presentGetCars(response: GetCarsResponse): void {
    this.cars = response.cars;
    this.updateCarViewModel();
  }

  setFlights(flights: PlaneTravel[]): void {
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

  cancelOdometer(): any {
    this.updateOdometerViewModel.displayed = false;
  }

  presentUpdateOdometer(response: UpdateOdometerResponse): void {
    if (response.isCarEmpty) {
      console.error('isCarEmpty');
    }
    if (response.isKmEmpty) {
      console.error('isKmEmpty');
    }
    if (response.isKmInvalid) {
      console.error('isKmInvalid');
    }
    if (response.updatedOdometer !== undefined) {
      const updatedOdometer = response.updatedOdometer;
      const savedCar = this.cars.find(car => car.id === updatedOdometer.carId);
      if (savedCar !== undefined) {
        savedCar.updateKm(updatedOdometer.km);
      }
      this.updateCarViewModel();
      this.updateOdometerViewModel.displayed = false;
    }
  }

  // UpdateOdometerPresenterInterface:end

  // AddCarPresenterInterface:begin

  cancelAddCar(): void {
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
      .map((car) => ({ id: car.id, name: car.name, km: car.km + ' km' }))
      .reverse();
  }

  private updateFlightViewModel() {
    this.homeViewModel.flights = this.flights
      .map((flight) => ({
        date: flight.date.toLocaleDateString('fr'),
        description: flight.description,
        km: flight.km + ' km',
      }))
      .reverse();
  }

}
