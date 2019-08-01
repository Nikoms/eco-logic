import { ElectricMeterRepository } from './Persistence/ElectricMeterRepository';
import { GetElectricMeters, SaveElectricMeter } from '../../eco/domain';

const electricMeterRepository = new ElectricMeterRepository([]);

export const getElectricMeters = new GetElectricMeters(electricMeterRepository);
export const saveElectricMeter = new SaveElectricMeter(electricMeterRepository);
