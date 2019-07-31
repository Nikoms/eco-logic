import { GetElectricMeters, SaveElectricMeter } from '@eco/domain';
import { ElectricMeterRepository } from './Persistence/ElectricMeterRepository';

const electricMeterRepository = new ElectricMeterRepository([]);

export const getElectricMeters = new GetElectricMeters(electricMeterRepository);
export const saveElectricMeter = new SaveElectricMeter(electricMeterRepository);
