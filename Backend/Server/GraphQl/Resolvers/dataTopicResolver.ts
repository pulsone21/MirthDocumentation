import { ObjectId } from "mongoose";
import DataTopic, { DataTopicModel } from "../../Classes/DataTopic";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(DataTopic)
export default class DataTopicResolver {
  @Query(() => [DataTopic])
  async GetAllDataTopics() {
    try {
      return await DataTopicModel.find({});
    } catch (err) {
      throw new Error("No DataTopic found in the DB!");
    }
  }

  @Query(() => DataTopic)
  async GetDataTopicByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
    try {
      return await DataTopicModel.findById(id);
    } catch (err) {
      throw new Error("No DataTopic found in the DB!");
    }
  }

  @Query(() => DataTopic)
  async GetDataTopicByShortName(@Arg("shortName") ShortName: String) {
    try {
      return await DataTopicModel.findOne({ shortName: ShortName });
    } catch (err) {
      throw new Error("No DataTopic found in the DB!");
    }
  }

  @Query(() => DataTopic)
  async GetDataTopicByLongName(@Arg("longName") LongName: String) {
    try {
      return await DataTopicModel.findOne({ longName: LongName });
    } catch (err) {
      throw new Error("No DataTopic found in the DB!");
    }
  }

  @Mutation(() => DataTopic)
  async CreateDataTopic(
    @Arg("shortName", () => String, { nullable: false }) shortName: String,
    @Arg("longName", () => String, { nullable: false }) longName: String
  ) {
    const dataTopic = await DataTopicModel.create({ shortName, longName });
    return dataTopic;
  }
}
