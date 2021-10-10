"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typegooseMiddleware_1 = require("./Middleware/typegooseMiddleware");
const ObjectId_1 = require("./myScalars/ObjectId");
const applicationResolver_1 = __importDefault(require("./Resolvers/applicationResolver"));
const channelNameResolver_1 = __importDefault(require("./Resolvers/channelNameResolver"));
const connectionTypeResolver_1 = __importDefault(require("./Resolvers/connectionTypeResolver"));
const dataAreaResolver_1 = __importDefault(require("./Resolvers/dataAreaResolver"));
const dataTopicResolver_1 = __importDefault(require("./Resolvers/dataTopicResolver"));
const dataTypeResolver_1 = __importDefault(require("./Resolvers/dataTypeResolver"));
const userResolver_1 = __importDefault(require("./Resolvers/userResolver"));
const vendorResolver_1 = __importDefault(require("./Resolvers/vendorResolver"));
async function CreateSchema() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            applicationResolver_1.default,
            vendorResolver_1.default,
            dataTypeResolver_1.default,
            dataTopicResolver_1.default,
            dataAreaResolver_1.default,
            connectionTypeResolver_1.default,
            channelNameResolver_1.default,
            userResolver_1.default,
        ],
        globalMiddlewares: [typegooseMiddleware_1.TypegooseMiddleware],
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: ObjectId_1.ObjectIdScalar }],
        validate: false,
    });
    return schema;
}
exports.default = CreateSchema;
//# sourceMappingURL=graphQlSchema.js.map