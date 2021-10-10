import { ObjectId } from "mongoose";
import DataType, { DataTypeModel } from "../../Classes/DataType";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(DataType)
export default class DataTypeResolver {
  @Query(() => [DataType])
  async GetAllDataTypes() {
    try {
      return await DataTypeModel.find({});
    } catch (err) {
      throw new Error("No DataType found in the DB!");
    }
  }

  @Query(() => DataType)
  async GetDataTypeByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
    try {
      return await DataTypeModel.findById(id);
    } catch (err) {
      throw new Error("No DataType found in the DB!");
    }
  }

  @Query(() => DataType)
  async GetDataTypeByShortName(@Arg("shortName") ShortName: String) {
    try {
      return await DataTypeModel.findOne({ shortName: ShortName });
    } catch (err) {
      throw new Error("No DataType found in the DB!");
    }
  }

  @Query(() => DataType)
  async GetDataTypeByLongName(@Arg("longName") LongName: String) {
    try {
      return await DataTypeModel.findOne({ longName: LongName });
    } catch (err) {
      throw new Error("No DataType found in the DB!");
    }
  }

  @Mutation(() => DataType)
  async CreateDataType(
    @Arg("shortName", () => String, { nullable: false }) shortName: String,
    @Arg("longName", () => String, { nullable: false }) longName: String
  ) {
    const dataType = await DataTypeModel.create({ shortName, longName });
    return dataType;
  }
}
