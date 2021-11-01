import { ObjectId } from "mongoose";
import ChannelName, { ChannelNameModel, ChannelNameResponse, Environment } from "../../Classes/ChannelName";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { DataTypeModel } from "../../Classes/DataType";
import { DataTopicModel } from "../../Classes/DataTopic";
import { DataAreaModel } from "../../Classes/DataArea";
import { ConnectionTypeModel } from "../../Classes/ConnectionType";
import { ApplicationModel } from "../../Classes/Application";
import { VendorModel } from "../../Classes/Vendor";
import ErrorMessage from "../../Types/ErrorMessage";

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

    @Mutation(() => ChannelNameResponse)
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
    ): Promise<ChannelNameResponse> {
        let Errors: ErrorMessage[] = [];

        const dataType = await DataTypeModel.findById(dataTypeID);
        if (!dataType) {
            Errors.push(new ErrorMessage("DataType", `No DataType with ${dataTypeID} found!`));
        }
        const dataTopic = await DataTopicModel.findById(dataTopicID);
        if (!dataType) {
            Errors.push(new ErrorMessage("DataTopic", `No DataTopic with ${dataTopicID} found!`));
        }
        const dataArea = await DataAreaModel.findById(dataAreaID);
        if (!dataArea) {
            Errors.push(new ErrorMessage("DataArea", `No DataArea with ${dataAreaID} found!`));
        }
        const connectionType = await ConnectionTypeModel.findById(conTypeID);
        if (!connectionType) {
            Errors.push(new ErrorMessage("ConnectionType", `No ConnectionType with ${conTypeID} found!`));
        }
        const vendor = await VendorModel.findById(vendorID);
        if (!vendor) {
            Errors.push(new ErrorMessage("Vendor", `No Vendor with ${vendorID} found!`));
        }
        const application = await ApplicationModel.findById(appID);
        if (!application) {
            Errors.push(new ErrorMessage("Application", `No Application with ${appID} found!`));
        }

        if (Errors.length > 0) {
            return {
                Errors,
            };
        } else {
            const ChannelName = await ChannelNameModel.create({
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

            if (!ChannelName) {
                return {
                    Errors: [{ field: "channelNumber", message: "ChannelName could not be created, please see ServerLog" }],
                };
            }
            ChannelName.name = `${dataArea?.shortName}${dataTopic?.shortName}_${application?.shortName}${vendor?.shortName}_${environment}_${version}_${channelNumber}_${connectionType?.shortName}`;
            ChannelName.save();
            return {
                ChannelName,
            };
        }
    }
}
