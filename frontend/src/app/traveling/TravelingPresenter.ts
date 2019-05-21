import { Car } from '@eco/core-travel/src/entity/Car';
import { HomeViewModel } from '@/domain/Traveling/UseCase/Home/HomeViewModel';
import { Odometer } from '@eco/core-travel/src/entity/Odometer';
import { PlaneTravel } from '@eco/core-travel/src/entity/PlaneTravel';
import { UpdateOdometerPresenterInterface } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import {
  UpdateOdometerCarViewModel,
  UpdateOdometerViewModel,
} from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerViewModel';
import { HomePresenterInterface } from '@/domain/Traveling/UseCase/Home/HomePresenterInterface';
import { AddCarPresenterInterface } from '@/domain/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddCarViewModel } from '@/domain/Traveling/UseCase/AddCar/AddCarViewModel';
import { AddFlightPresenterInterface } from '@/domain/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightViewModel } from '@/domain/Traveling/UseCase/AddFlight/AddFlightViewModel';

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

  setCars(cars: Car[]) {
    this.cars = cars;
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
    this.updateOdometerViewModel.selectedCar = selectedCar;
  }

  getUpdateOdometerViewModel(): UpdateOdometerViewModel {
    return this.updateOdometerViewModel;
  }

  updatedOdometer(odometer: Odometer) {
    const savedCar = this.cars.find(car => car.id === odometer.carId);
    if (savedCar !== undefined) {
      savedCar.updateKm(odometer.km);
    }
    this.updateCarViewModel();
    this.updateOdometerViewModel.displayed = false;
  }

  cancelOdometer(): any {
    this.updateOdometerViewModel.displayed = false;
  }

  carNotSelected(): void {
    console.error('car not selected');
  }

  kmIsEmpty(): void {
    console.error('kmIsEmpty');
  }

  kmIsNaN(): void {
    console.error('kmIsNaN');
  }

  // UpdateOdometerPresenterInterface:end

  // AddCarPresenterInterface:begin

  addedCar(car: Car): void {
    this.cars.push(car);
    this.updateCarViewModel();
    this.addCarViewModel.displayed = false;
  }

  cancelAddCar(): void {
    this.addCarViewModel.displayed = false;
  }

  consumptionInvalid(): void {
    console.error('consumptionInvalid');
  }

  engineInvalid(): void {
    console.error('engineInvalid');
  }

  getAddCarViewModel(): AddCarViewModel {
    return this.addCarViewModel;
  }

  showAddCar(): void {
    this.addCarViewModel.displayed = true;
  }

  nameIsEmpty(): void {
    console.error('nameIsEmpty');
  }

  // AddCarPresenterInterface:end

  // AddFlightPresenterInterface:begin
  cancelAddFlight(): void {
    this.addFlightViewModel.displayed = false;
  }


  addedFlight(flight: PlaneTravel): void {
    this.flights.push(flight);
    this.updateFlightViewModel();
    this.addFlightViewModel.displayed = false;
  }

  getAddFlightViewModel(): AddFlightViewModel {
    return this.addFlightViewModel;
  }

  invalidKm(): void {
    console.error('invalidKm');
  }

  invalidSeat(): void {
    console.error('invalidSeat');
  }

  showAddFlight(): void {
    this.addFlightViewModel.displayed = true;
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
