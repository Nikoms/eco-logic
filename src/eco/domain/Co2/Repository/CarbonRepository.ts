import { Carbon } from '../Entity/Carbon';

export interface CarbonRepository {
  getAll(): Promise<Carbon[]>;

  add(carbon: Carbon): Promise<void>;

  nextIdentity(): Promise<string>;
}
