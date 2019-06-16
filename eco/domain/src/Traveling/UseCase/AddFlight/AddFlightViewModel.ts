import { Seat } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export class AddFlightViewModel {
  displayed = false;
  seats = [Seat.economyClass, Seat.businessClass, Seat.firstClass];
  titleLabel = 'Add a flight';
  cancelLabel = 'Cancel';
  saveLabel = 'Save';
  descriptionLabel = 'Description';
  seatsLabel = 'Select your seat';
}
