import {
  AddCarPresenterInterface,
  AddCarResponse,
  AddFlightPresenterInterface,
  AddFlightResponse,
  Car,
  GetCarsPresenterInterface,
  GetCarsResponse,
  GetFlightsPresenterInterface,
  GetFlightsResponse,
  PlaneTravel,
  UpdateOdometerPresenterInterface,
  UpdateOdometerResponse,
} from '@eco/domain';
import { TravelingUI } from './TravelingUI';
import { CarViewModel, FlightViewModel, ViewModel } from './ViewModel';

export class TravelingUIPresenter
  implements UpdateOdometerPresenterInterface,
    GetCarsPresenterInterface,
    AddCarPresenterInterface,
    AddFlightPresenterInterface,
    GetCarsPresenterInterface,
    GetFlightsPresenterInterface,
    TravelingUI {

  private cars: Car[] = [];
  private _viewModel = new ViewModel();
  private flights: PlaneTravel[] = [];

  constructor() {
  }

  get viewModel() {
    return this._viewModel;
  }

  presentGetCars(response: GetCarsResponse): void {
    this.cars = response.cars;
    this.updateCarViewModel();
  }

  presentGetFlights(response: GetFlightsResponse): void {
    this.flights = response.flights;
    this.updateFlightViewModel();
  }

  showUpdateOdometer(selectedCar: CarViewModel) {
    this.viewModel.doUpdateOdometerView({ displayed: true, selectedCar });
  }

  hideUpdateOdometer(): any {
    this.viewModel.doUpdateOdometerView({ displayed: false, selectedCar: undefined });
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
      this.viewModel.doUpdateOdometerView({ displayed: false, selectedCar: undefined });
    }
  }

  hideAddCar(): void {
    this.viewModel.doUpdateAddCarView({ displayed: false });
  }

  showAddCar(): void {
    this.viewModel.doUpdateAddCarView({ displayed: true });
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
      this.cars.unshift(response.newCar);
      this.updateCarViewModel();
      this.viewModel.doUpdateAddCarView({ displayed: false });
    }
  }

  cancelAddFlight(): void {
    this.viewModel.doUpdateAddFlightView({ displayed: false });
  }

  showAddFlight(): void {
    this.viewModel.doUpdateAddFlightView({ displayed: true });
  }

  presentAddFlight(response: AddFlightResponse): void {
    if (response.isInvalidKm) {
      console.error('invalid km');
    }
    if (response.isInvalidSeat) {
      console.error('invalid seat');
    }
    if (response.newFlight !== undefined) {
      this.flights.unshift(response.newFlight);
      this.updateFlightViewModel();
      this.viewModel.doUpdateAddFlightView({ displayed: false });
    }
  }

  private updateCarViewModel() {
    const cars = this.cars.map(car => {
      return new CarViewModel(car.id, car.name, car.km + ' Km');
    });

    this.viewModel.doUpdate({ cars });
  }

  private updateFlightViewModel() {
    const flights = this.flights.map(flight => {
      return new FlightViewModel(
        flight.date.toLocaleDateString('fr'),
        flight.km + ' Km',
        flight.description,
      );
    });
    this.viewModel.doUpdate({ flights });
  }
}
