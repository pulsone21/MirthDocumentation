import { ObjectId } from "mongoose";
import ConnectionType, { ConnectionTypeModel } from "../../Classes/ConnectionType";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(ConnectionType)
export default class ConnectionTypeResolver {
  @Query(() => [ConnectionType])
  async GetAllConnectionTypes() {
    try {
      return await ConnectionTypeModel.find({});
    } catch (err) {
      throw new Error("No ConnectionType found in the DB!");
    }
  }

  @Query(() => ConnectionType)
  async GetConnectionTypesByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
    try {
      return await ConnectionTypeModel.findById(id);
    } catch (err) {
      throw new Error("No ConnectionType found in the DB!");
    }
  }

  @Query(() => ConnectionType)
  async GetConnectionTypeByShortName(@Arg("shortName") ShortName: String) {
    try {
      return await ConnectionTypeModel.findOne({ shortName: ShortName });
    } catch (err) {
      throw new Error("No ConnectionType found in the DB!");
    }
  }

  @Query(() => ConnectionType)
  async GetConnectionTypeByLongName(@Arg("longName") LongName: String) {
    try {
      return await ConnectionTypeModel.findOne({ longName: LongName });
    } catch (err) {
      throw new Error("No ConnectionType found in the DB!");
    }
  }

  @Mutation(() => ConnectionType)
  async CreateConnectionType(
    @Arg("shortName", () => String, { nullable: false }) shortName: String,
    @Arg("longName", () => String, { nullable: false }) longName: String
  ) {
    const connectionType = await ConnectionTypeModel.create({ shortName, longName });
    return connectionType;
  }
}
