import { ObjectId } from "mongoose";
import DataArea, { DataAreaModel } from "../../Classes/DataArea";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(DataArea)
export default class DataAreaResolver {
  @Query(() => [DataArea])
  async GetAllDataAreas() {
    try {
      return await DataAreaModel.find({});
    } catch (err) {
      throw new Error("No DataArea found in the DB!");
    }
  }

  @Query(() => DataArea)
  async GetDataAreaByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
    try {
      return await DataAreaModel.findById(id);
    } catch (err) {
      throw new Error("No DataArea found in the DB!");
    }
  }

  @Query(() => DataArea)
  async GetDataAreaByShortName(@Arg("shortName") ShortName: String) {
    try {
      return await DataAreaModel.findOne({ shortName: ShortName });
    } catch (err) {
      throw new Error("No DataArea found in the DB!");
    }
  }

  @Query(() => DataArea)
  async GetDataAreaByLongName(@Arg("longName") LongName: String) {
    try {
      return await DataAreaModel.findOne({ longName: LongName });
    } catch (err) {
      throw new Error("No DataArea found in the DB!");
    }
  }

  @Mutation(() => DataArea)
  async CreateDataArea(
    @Arg("shortName", () => String, { nullable: false }) shortName: String,
    @Arg("longName", () => String, { nullable: false }) longName: String
  ) {
    const dataArea = await DataAreaModel.create({ shortName, longName });
    return dataArea;
  }
}
