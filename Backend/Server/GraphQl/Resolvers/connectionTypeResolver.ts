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
        const ConnectionType = await ConnectionTypeModel.findOne({ shortName });
        if (!ConnectionType) {
            return {
                Errors: [
                    {
                        field: "shortName",
                        message: `No DataType found with Shortname: ${shortName}`,
                    },
                ],
            };
        } else {
            return {
                ConnectionType,
            };
        }
    }

    @Query(() => ConnectionTypeResponse)
    async GetConnectionTypeByLongName(@Arg("longName") longName: String): Promise<ConnectionTypeResponse> {
        const ConnectionType = await ConnectionTypeModel.findOne({ longName });
        if (!ConnectionType) {
            return {
                Errors: [
                    {
                        field: "longName",
                        message: `No DataType found with Longname: ${longName}`,
                    },
                ],
            };
        } else {
            return {
                ConnectionType,
            };
        }
    }

    @Query(() => ConnectionTypeResponse)
    async GetConnectionTypeByID(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<ConnectionTypeResponse> {
        const ConnectionType = await ConnectionTypeModel.findOne({ id });
        if (!ConnectionType) {
            return {
                Errors: [
                    {
                        field: "ID",
                        message: `No DataType found with ID: ${id}`,
                    },
                ],
            };
        } else {
            return {
                ConnectionType,
            };
        }
    }
    @Mutation(() => ConnectionTypeResponse)
    async CreateConnectionType(
        @Arg("shortName", () => String, { nullable: false }) shortName: String,
        @Arg("longName", () => String, { nullable: false }) longName: String
    ): Promise<ConnectionTypeResponse> {
        const existing = await ConnectionTypeModel.find({ shortName });
        if (existing.length > 0) {
            return {
                Errors: [
                    {
                        field: "shortName",
                        message: `${shortName} is already taken`,
                    },
                ],
            };
        }
        const ConnectionType = await ConnectionTypeModel.create({ shortName, longName });
        if (!ConnectionType) {
            return {
                Errors: [
                    {
                        field: "shortName",
                        message: "Somehting went wrong!",
                    },
                ],
            };
        }
        return {
            ConnectionType,
        };
    }
}
