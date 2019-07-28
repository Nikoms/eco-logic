import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import ProjectResolver from './resolvers/ProjectResolver';
import TaskResolver from './resolvers/TaskResolver';
import restify from 'restify';
import { graphqlRestify } from 'apollo-server-restify';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';


async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ProjectResolver, TaskResolver],
    emitSchemaFile: true,
  });

  const server = restify.createServer();
  const graphQLOptions: { schema: any } = { schema };

  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());

  server.post('/graphql', graphqlRestify(() => {
    return graphQLOptions;
  }));

  console.log(new ElectricMeter('', '', 1, new Date()));
  server.listen(3000, () => console.log(`Listening on port 3000}`));

}

bootstrap();
