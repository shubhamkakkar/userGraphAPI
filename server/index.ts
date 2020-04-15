import mongoose from 'mongoose';
import {config} from 'dotenv';
import Redis from 'ioredis';

import {resolve} from 'path';
import {ApolloServer} from 'apollo-server';
import schema from './schema/schema';
import resolver from './resolver/resolver';

config({path: resolve(__dirname, './.env')});
const {MONGO_URI_DEV} = process.env;

if (MONGO_URI_DEV) {
  mongoose
    .connect(MONGO_URI_DEV, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      const redis = new Redis();
      const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolver,
        context: {redis},
      });
      server.listen({port: process.env.PORT || 4000}).then(({url}: {url: string}) => {
        console.log(`🚀 Server ready at ${url}`);
      });
    })
    .catch((er: any) => console.log('failed to connect to mongoose', er));
} else {
  console.error('MongoDB url not found');
}
