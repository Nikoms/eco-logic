import { InitElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersResponse';

export interface InitElectricMetersPresenterInterface {
  presentInitElectricMetersResponse(response: InitElectricMetersResponse): void;
}
