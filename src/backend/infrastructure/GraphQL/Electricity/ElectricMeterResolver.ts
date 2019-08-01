import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ElectricMeterSchema, SaveElectricSchemaInput } from './ElectricMeterSchema';
import { getElectricMeters, saveElectricMeter } from '../../di';
import { GetElectricMetersResponse, SaveElectricMeterRequest, SaveElectricMeterResponse } from '@eco/domain';
import { CallUseCase } from '../CallUseCase';
import { ElectricityPresenter } from './ElectricityPresenter';


@Resolver(_of => ElectricMeterSchema)
export class ElectricMeterResolver {
  @Query(_returns => [ElectricMeterSchema])
  async electricMeters(): Promise<ElectricMeterSchema[]> {
    const presenter = await CallUseCase<GetElectricMetersResponse>(getElectricMeters, new ElectricityPresenter());

    return presenter
      .response
      .electricMeters;
  }

  @Mutation(_returns => ElectricMeterSchema)
  async createElectricMeter(@Arg('electricMeter') electricMeter: SaveElectricSchemaInput): Promise<ElectricMeterSchema> {
    const presenter = await CallUseCase<SaveElectricMeterResponse>(
      saveElectricMeter,
      new ElectricityPresenter(),
      new SaveElectricMeterRequest(electricMeter.name),
    );

    if (!presenter.response.hasValidName) {
      throw new Error(`The provided name is invalid`);
    }
    return presenter.response.meter as ElectricMeterSchema;
  }
}
