import { Carbon } from '../entity/Carbon';

export interface CarbonRepository {
  getAll(): Promise<Carbon[]>;

  add(carbon: Carbon): Promise<void>;
}
