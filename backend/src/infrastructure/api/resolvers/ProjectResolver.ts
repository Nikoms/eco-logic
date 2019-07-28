import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { ProjectData, projects, tasks } from '../data';
import Project from '../schemas/Project';

@Resolver(_of => Project)
export default class {
  @Query(_returns => Project, { nullable: true })
  projectByName(@Arg('name', { defaultValue: 'Workout' }) name: string): ProjectData | undefined {
    return projects.find(project => project.name === name);
  }

  @FieldResolver()
  tasks(@Root() projectData: ProjectData) {
    return tasks.filter(task => {
      return task.project_id === projectData.id;
    });
  }
}
