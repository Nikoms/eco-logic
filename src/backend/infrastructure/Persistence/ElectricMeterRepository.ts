import { v4 } from 'uuid';
import { ElectricityMeterRepositoryInterface, ElectricMeter } from '@eco/domain';

export class ElectricMeterRepository implements ElectricityMeterRepositoryInterface {
  constructor(private list: ElectricMeter[] = []) {
  }

  async getAll(): Promise<ElectricMeter[]> {
    return this.getList();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  async get(id: string): Promise<ElectricMeter | undefined> {
    return this.getList().find((meter: ElectricMeter) => {
      return meter.id === id;
    });
  }

  add(electricMeterToSave: ElectricMeter): Promise<void> {
    return this.save(electricMeterToSave);
  }

  update(electricMeter: ElectricMeter): Promise<void> {
    return this.save(electricMeter);
  }

  private async save(electricMeterToSave: ElectricMeter) {
    const list = this.getList();
    const index = list.findIndex((meter: ElectricMeter) => {
      return meter.id === electricMeterToSave.id;
    });
    if (index === -1) {
      list.push(electricMeterToSave);
    } else {
      list[index] = electricMeterToSave;
    }
    this.saveList(list);
  }

  private getList(): ElectricMeter[] {
    return this.list;
  }

  private saveList(list: any[]) {
    this.list = list;
  }
}
