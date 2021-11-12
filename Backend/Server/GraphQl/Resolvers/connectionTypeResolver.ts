import { ObjectId } from "mongoose";
import ConnectionType, { ConnectionTypeModel, ConnectionTypeResponse } from "../../Classes/ConnectionType";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(ConnectionType)
export default class ConnectionTypeResolver {
    @Query(() => [ConnectionType])
    async GetAllConnectionTypes(): Promise<ConnectionType[]> {
        return await ConnectionTypeModel.find({});
    }
    @Query(() => ConnectionTypeResponse)
    async GetConnectionTypeByShortName(@Arg("shortName") shortName: String): Promise<ConnectionTypeResponse> {
        const ConnectionType = await ConnectionTypeModel.find({ shortName });
        if (!ConnectionType) return { Errors: [{ field: "shortName", message: `No ConnectionType found with Shortname: ${shortName}` }] };
        if (ConnectionType.length > 1) return { Errors: [{ field: "shortName", message: `More then one ConnectionType found with Shortname: ${shortName}` }] };
        return { ConnectionType: ConnectionType[0] };
    }

    @Query(() => ConnectionTypeResponse)
    async GetConnectionTypeByLongName(@Arg("longName") longName: String): Promise<ConnectionTypeResponse> {
        const ConnectionType = await ConnectionTypeModel.find({ longName });
        if (!ConnectionType) return { Errors: [{ field: "longName", message: `No ConnectionType found with Longname: ${longName}` }] };
        if (ConnectionType.length > 1) return { Errors: [{ field: "longName", message: `More then one ConnectionType found with Longname: ${longName}` }] };
        return { ConnectionType: ConnectionType[0] };
    }

    @Query(() => ConnectionTypeResponse)
    async GetConnectionTypeByID(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<ConnectionTypeResponse> {
        const ConnectionType = await ConnectionTypeModel.findOne({ id });
        if (!ConnectionType) return { Errors: [{ field: "ID", message: `No ConnectionType found with ID: ${id}` }] };
        return { ConnectionType };
    }

    @Mutation(() => ConnectionTypeResponse)
    async CreateConnectionType(
        @Arg("shortName", () => String, { nullable: false }) shortName: String,
        @Arg("longName", () => String, { nullable: false }) longName: String
    ): Promise<ConnectionTypeResponse> {
        const existing = await ConnectionTypeModel.find({ shortName });
        if (existing.length > 0) return { Errors: [{ field: "shortName", message: `${shortName} is already taken` }] };
        const ConnectionType = await ConnectionTypeModel.create({ shortName, longName });
        if (!ConnectionType) return { Errors: [{ field: "shortName", message: "Somehting went wrong!" }] };
        return { ConnectionType };
    }
}
