import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'graphql';
// @ts-ignore
import graphqlHTTP = require('express-graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  public content: any;
  public author: any;

  constructor(public id: string, { content, author }) {
    this.content = content;
    this.author = author;
  }
}

// Maps username to content 2 :)
const fakeDatabase = {};

const root = {
  getMessage: function({ id }) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function({ input }) {
    // Create a random id for our "database".
    const id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function({ id, input }) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
