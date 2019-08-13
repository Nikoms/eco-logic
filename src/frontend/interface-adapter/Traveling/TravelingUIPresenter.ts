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
} from '../../../eco/domain';
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
    this.viewModel.setUpdateOdometerForm({
      displayed: true,
      previouslyPlaceHolder: 'Previously: ' + selectedCar.distance,
      carName: selectedCar.name,
      carId: selectedCar.id,
    });
  }

  hideUpdateOdometer(): any {
    this.viewModel.setUpdateOdometerForm({
      displayed: false,
      previouslyPlaceHolder: '',
      carName: '',
      carId: '',
    });
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
      this.hideUpdateOdometer();
    }
  }

  hideAddCar(): void {
    this.viewModel.addCarView.setDisplayed(false);
  }

  showAddCar(): void {
    this.viewModel.addCarView.setDisplayed(true);
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
      this.hideAddCar();
    }
  }

  cancelAddFlight(): void {
    this.viewModel.setDisplayAddFlight(false);
  }

  showAddFlight(): void {
    this.viewModel.setDisplayAddFlight(true);
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
      this.viewModel.setDisplayAddFlight(false);
    }
  }

  private updateCarViewModel() {
    this.viewModel.updateCars(this.cars.map(car => {
      return new CarViewModel(car.id, car.name, car.km + ' Km');
    }));
  }

  private updateFlightViewModel() {
    this.viewModel.updateFlights(this.flights.map(flight => {
      return new FlightViewModel(
        flight.date.toLocaleDateString('fr'),
        flight.km + ' Km',
        flight.description,
      );
    }));
  }
}
