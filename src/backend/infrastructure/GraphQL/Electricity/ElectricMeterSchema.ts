import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ElectricMeterSchema {
  @Field(_type => ID)
  public id?: string;

  @Field()
  public name?: string;

  @Field(_type => Int)
  public kWh?: number;

  @Field()
  public lastKWhUpdate?: Date;
}

@InputType()
export class SaveElectricSchemaInput {
  @Field()
  // @ts-ignore
  public name: string;
}
