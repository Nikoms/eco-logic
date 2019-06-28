import { Carbon } from '@eco/domain/src/Co2/Entity/Carbon';

export interface CarbonRepository {
  getAll(): Promise<Carbon[]>;

  add(carbon: Carbon): Promise<void>;

  nextIdentity(): Promise<string>;
}
