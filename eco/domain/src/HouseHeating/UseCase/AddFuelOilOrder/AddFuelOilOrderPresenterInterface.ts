import { AddFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderResponse';

export interface AddFuelOilOrderPresenterInterface {
  presentAddFuelOilOrder(response: AddFuelOilOrderResponse): void;
}
