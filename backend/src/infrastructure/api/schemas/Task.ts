import { Field, Int, ObjectType } from 'type-graphql';
import Project from './Project';

@ObjectType()
export default class Task {
  @Field(_type => Int)
  id: number;

  @Field()
  title: string;

  @Field(_type => Project)
  project: Project;

  @Field()
  completed: boolean;
}
