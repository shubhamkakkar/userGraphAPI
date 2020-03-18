import mongoose from "mongoose"
import {config} from "dotenv"

import { resolve } from "path"
import {ApolloServer} from "apollo-server";
import schema from "./server/schema/schema";
import resolver from "./server/resolver/resolver";

config({ path: resolve(__dirname, "./.env") });
const { MONGO_URI_DEV  } = process.env;

if(MONGO_URI_DEV){
    mongoose.connect(MONGO_URI_DEV, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
        .then(() => {
            const server = new ApolloServer({ typeDefs: schema, resolvers: resolver });
            server.listen({ port: process.env.PORT || 4000 }).then(({ url }: { url: string }) => {
                console.log(`🚀 Server ready at ${url}`);
            });
        })
        .catch((er: any) => console.log("failed to connect to mongoose", er));
}else{
    console.error("MongoDB url not found");
}

