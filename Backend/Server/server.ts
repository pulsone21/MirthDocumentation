import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";

require("dotenv").config();
import cors from "cors";
import CreateSchema from "./GraphQl/graphQlSchema";
import session from "express-session";
import MongoStore from "connect-mongo";
import { MyContext } from "./Types/MyContext";
import { CheckAdminUser } from "./CodeBase/InitialCheck";

const app = express();
startServer();
//TODO built out something to check the config File, that everything is set up.

async function startServer() {
    const usedPort = process.env.PORT || "8443";
    const dbUrl = process.env.DB_URL || "";

    mongoose.connect(dbUrl, async () => {
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
                    mongoUrl: dbUrl,
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

        app.use(graphqlUploadExpress()); //enabling fileUploades

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

        app.get("/Server/Interface/Images/:image", function (req, res) {
            console.log("Request Get");
            var options = {
                root: process.env.APP_BASE_DIR + "\\Backend\\Server\\Interface\\Images\\",
                dotfiles: "deny",
                headers: {
                    "x-timestamp": Date.now(),
                    "x-sent": true,
                },
            };
            res.sendFile(req.params.image, options, function (err) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log("Sent: " + req.params.image);
                }
            });
        });
        CheckAdminUser();
        app.listen({ port: usedPort }, () => {
            console.log(`🚀 Server ready at http://localhost:${usedPort}${server.graphqlPath}`);
        });
    });
}
