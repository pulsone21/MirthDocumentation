import { ObjectId } from "mongoose";
import ChannelName, { ChannelNameModel, Environment } from "../../Classes/ChannelName";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { DataTypeModel } from "../../Classes/DataType";
import { DataTopicModel } from "../../Classes/DataTopic";
import { DataAreaModel } from "../../Classes/DataArea";
import { ConnectionTypeModel } from "../../Classes/ConnectionType";
import { ApplicationModel } from "../../Classes/Application";
import { VendorModel } from "../../Classes/Vendor";

@Resolver(ChannelName)
export default class ChannelNameResolver {
  @Query(() => [ChannelName])
  async GetAllChannelNames() {
    try {
      return await ChannelNameModel.find({});
    } catch (err) {
      throw new Error("No ChannelName found in the DB!");
    }
  }

  @Query(() => ChannelName)
  async GetChannelNameByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
    try {
      return await ChannelNameModel.findById(id);
    } catch (err) {
      throw new Error("No ChannelName found in the DB!");
    }
  }

  @Mutation(() => ChannelName)
  async CreateChannelName(
    @Arg("dataTypeID", () => ObjectIdScalar) dataTypeID: ObjectId,
    @Arg("dataTopicID", () => ObjectIdScalar) dataTopicID: ObjectId,
    @Arg("dataAreaID", () => ObjectIdScalar) dataAreaID: ObjectId,
    @Arg("conTypeID", () => ObjectIdScalar) conTypeID: ObjectId,
    @Arg("vendorID", () => ObjectIdScalar) vendorID: ObjectId,
    @Arg("appID", () => ObjectIdScalar) appID: ObjectId,
    @Arg("env", (_) => Environment) environment: Environment,
    @Arg("version", (_) => Int) version: number,
    @Arg("channelNumber") channelNumber: string
  ) {
    const dataType = await DataTypeModel.findById(dataTypeID);
    const dataTopic = await DataTopicModel.findById(dataTopicID);
    const dataArea = await DataAreaModel.findById(dataAreaID);
    const connectionType = await ConnectionTypeModel.findById(conTypeID);
    const vendor = await VendorModel.findById(vendorID);
    const application = await ApplicationModel.findById(appID);

    if (dataType && dataTopic && dataArea && connectionType && vendor && application) {
      const channelName = await ChannelNameModel.create({
        dataType,
        dataTopic,
        dataArea,
        connectionType,
        vendor,
        application,
        environment,
        version,
        channelNumber,
      });
      channelName.name = `${dataArea.shortName}${dataTopic.shortName}_${application.shortName}${vendor.shortName}_${environment}_${version}_${channelNumber}_${connectionType.shortName}`;
      channelName.save();
      if (channelName) {
        return channelName;
      } else {
        throw new Error("Channelname couldnt be created");
      }
    } else {
      throw new Error("One of the Related Objects where not found!");
    }
  }
}
