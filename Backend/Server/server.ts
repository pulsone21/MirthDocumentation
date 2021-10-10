import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
const app = express();
import { ApolloServer } from "apollo-server-express";
require("dotenv").config();

import CreateSchema from "./GraphQl/graphQlSchema";

startServer();

async function startServer() {
  const usedPort = process.env.PORT;
  const dbUrl = process.env.DB_URL;
  const dbUser = process.env.DB_USER;
  const dbPw = process.env.DB_PASSWORD;
  const dbName = process.env.DB_Name;

  mongoose.connect(`mongodb://${dbUser}:${dbPw}@${dbUrl}/${dbName}`, async () => {
    console.log("Connected to DB");

    const schema = await CreateSchema();

    const server = new ApolloServer({
      schema,
    });

    await server.start();
    server.applyMiddleware({
      app,
      path: "/graphql",
    });

    app.use(express.static("public"));

    app.listen({ port: usedPort }, () => {
      console.log(`🚀 Server ready at http://localhost:${usedPort}${server.graphqlPath}`);
    });
  });
}
