import { Odometer } from '@eco/core-travel/src/entity/Odometer';

export interface OdometerRepositoryInterface {
  nextIdentity(): Promise<string>;

  add(odometer: Odometer): Promise<void>;
}
