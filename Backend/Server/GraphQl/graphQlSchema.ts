import { ObjectId } from "mongodb";
import { buildSchema } from "type-graphql";
import { TypegooseMiddleware } from "./Middleware/typegooseMiddleware";
import { ObjectIdScalar } from "./myScalars/ObjectId";
import ApplicationResolver from "./Resolvers/applicationResolver";
import ChannelNameResolver from "./Resolvers/channelNameResolver";
import ConnectionTypeResolver from "./Resolvers/connectionTypeResolver";
import DataAreaResolver from "./Resolvers/dataAreaResolver";
import DataTopicResolver from "./Resolvers/dataTopicResolver";
import DataTypeResolver from "./Resolvers/dataTypeResolver";
import UserResolver from "./Resolvers/userResolver";
import VendorResolver from "./Resolvers/vendorResolver";

export default async function CreateSchema() {
    const schema = await buildSchema({
        resolvers: [
            ApplicationResolver,
            VendorResolver,
            DataTypeResolver,
            DataTopicResolver,
            DataAreaResolver,
            ConnectionTypeResolver,
            ChannelNameResolver,
            UserResolver,
        ],
        globalMiddlewares: [TypegooseMiddleware],
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
        // authChecker: ({ context: { req } }) => {
        //     return !!req.session.userId;
        // },
    });
    return schema;
}
