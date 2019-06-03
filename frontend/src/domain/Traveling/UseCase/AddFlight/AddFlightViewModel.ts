import { Seat } from '@eco/core-travel/src/entity/PlaneTravel';
import { AddFlightRequest } from '@/domain/Traveling/UseCase/AddFlight/AddFlightRequest';

export class AddFlightViewModel {
  displayed = false;
  seats = [Seat.economyClass, Seat.businessClass, Seat.firstClass];
  titleLabel = 'Add a flight';
  cancelLabel = 'Cancel';
  saveLabel = 'Save';
  descriptionLabel = 'Description';
  seatsLabel = 'Select your seat';
}
