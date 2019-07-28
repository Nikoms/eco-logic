import { Field, Int, ObjectType } from 'type-graphql';
import Task from './Task';

@ObjectType()
export default class Project {
  @Field(_type => Int)
  id: number;

  @Field()
  name: string;

  @Field(_type => [Task])
  tasks: Task[];
}
