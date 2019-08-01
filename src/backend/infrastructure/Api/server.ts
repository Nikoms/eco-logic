import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import restify from 'restify';
import { graphqlRestify } from 'apollo-server-restify';
import { ElectricMeterResolver } from '../GraphQL/Electricity/ElectricMeterResolver';

export async function runServer(port = 3000) {
  const schema = await buildSchema({
    resolvers: [ElectricMeterResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = restify.createServer();
  const graphQLOptions: { schema: any } = { schema };

  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());

  server.post('/graphql', graphqlRestify(() => {
    return graphQLOptions;
  }));

  server.listen(port, () => console.log(`Listening on port ${port}`));
}

