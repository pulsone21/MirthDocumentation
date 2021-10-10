"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const apollo_server_express_1 = require("apollo-server-express");
require("dotenv").config();
const graphQlSchema_1 = __importDefault(require("./GraphQl/graphQlSchema"));
startServer();
async function startServer() {
    const usedPort = process.env.PORT;
    const dbUrl = process.env.DB_URL;
    const dbUser = process.env.DB_USER;
    const dbPw = process.env.DB_PASSWORD;
    const dbName = process.env.DB_Name;
    mongoose_1.default.connect(`mongodb://${dbUser}:${dbPw}@${dbUrl}/${dbName}`, async () => {
        console.log("Connected to DB");
        const schema = await (0, graphQlSchema_1.default)();
        const server = new apollo_server_express_1.ApolloServer({
            schema,
        });
        await server.start();
        server.applyMiddleware({
            app,
            path: "/graphql",
        });
        app.use(express_1.default.static("public"));
        app.listen({ port: usedPort }, () => {
            console.log(`🚀 Server ready at http://localhost:${usedPort}${server.graphqlPath}`);
        });
    });
}
//# sourceMappingURL=server.js.map