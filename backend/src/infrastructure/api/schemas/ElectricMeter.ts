import { Field, ID, Int, ObjectType } from 'type-graphql';
import { ElectricMeterInterface } from '@eco/domain/src/Electricity/Entity/ElectricMeterInterface';

@ObjectType()
export class ElectricMeter implements ElectricMeterInterface {
  @Field(_type => ID)
  // @ts-ignore
  public id: string;
  @Field()
  // @ts-ignore
  public name: string;
  @Field(_type => Int)
  // @ts-ignore
  public kWh: number;
  @Field()
  // @ts-ignore
  public lastKWhUpdate: Date;
}
