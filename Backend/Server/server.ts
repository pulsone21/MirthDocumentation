import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
const app = express();
import { ApolloServer } from "apollo-server-express";
require("dotenv").config();
import cors from "cors";
import CreateSchema from "./GraphQl/graphQlSchema";
import session from "express-session";
import MongoStore from "connect-mongo";
import { MyContext } from "./Types/MyContext";

startServer();

async function startServer() {
    const usedPort = process.env.PORT;
    const dbUrl = process.env.DB_URL;
    const dbUser = process.env.DB_USER;
    const dbPw = process.env.DB_PASSWORD;
    const dbName = process.env.DB_Name;
    const mongoUrl = `mongodb://${dbUser}:${dbPw}@${dbUrl}/${dbName}`;

    mongoose.connect(mongoUrl, async () => {
        console.log("Connected to DB");
        const corsOptions: cors.CorsOptions = {
            credentials: true,
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        };
        app.use(cors(corsOptions));

        app.use(
            session({
                name: process.env.SESSION_COOKIE_NAME || "uid",
                secret: process.env.SESSION_SECRET || "MYDEFAULTSECRET",
                saveUninitialized: false, // don't create session until something stored
                resave: false, //don't save session if unmodified
                store: MongoStore.create({
                    mongoUrl,
                    touchAfter: 3600,
                }),
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true,
                    sameSite: "lax",
                    // secure: false, //TODO Update that to be variable for specific environments
                },
            })
        );

        const schema = await CreateSchema();

        const server = new ApolloServer({
            schema,
            context: ({ req, res }): MyContext => ({ req, res }),
        });

        await server.start();
        server.applyMiddleware({
            app,
            path: "/graphql",
            cors: false,
        });

        app.listen({ port: usedPort }, () => {
            console.log(`🚀 Server ready at http://localhost:${usedPort}${server.graphqlPath}`);
        });
    });
}
