import { GetTotalFuelOilOrderResponse } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderResponse';
import { GetTotalFuelOilOrderViewModel } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderViewModel';

export interface GetTotalFuelOilOrderPresenterInterface {
  getGetTotalFuelOilOrderViewModel(): GetTotalFuelOilOrderViewModel;

  presentGetTotalFuelOilOrder(response: GetTotalFuelOilOrderResponse): void;
}
