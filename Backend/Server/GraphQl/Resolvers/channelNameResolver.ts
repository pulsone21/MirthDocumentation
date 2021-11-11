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
import { Channel } from "diagnostics_channel";

@Resolver(ChannelName)
export default class ChannelNameResolver {
    @Query(() => [ChannelName])
    async GetAllChannelNames(): Promise<ChannelName[]> {
        return await ChannelNameModel.find({});
    }

    @Query(() => ChannelName)
    async GetChannelNameByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
        try {
            return await ChannelNameModel.findById(id);
        } catch (err) {
            throw new Error("No ChannelName found in the DB!");
        }
    }

    @Query(() => ChannelName)
    async GetChannelNameByFullName(@Arg("name") name: string) {
        return await ChannelNameModel.find({ name });
    }

    @Mutation(() => Boolean)
    async ChannelnameExist(@Arg("name") name: string): Promise<Boolean> {
        let channelName = await ChannelNameModel.find({ name });
        if (channelName.length > 0) return true;
        return false;
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
            Errors.push({ field: "DataType", message: `No DataType with ${dataTypeID} found!` });
        }
        const dataTopic = await DataTopicModel.findById(dataTopicID);
        if (!dataType) {
            Errors.push({ field: "DataTopic", message: `No DataTopic with ${dataTopicID} found!` });
        }
        const dataArea = await DataAreaModel.findById(dataAreaID);
        if (!dataArea) {
            Errors.push({ field: "DataArea", message: `No DataArea with ${dataAreaID} found!` });
        }
        const connectionType = await ConnectionTypeModel.findById(conTypeID);
        if (!connectionType) {
            Errors.push({ field: "ConnectionType", message: `No ConnectionType with ${conTypeID} found!` });
        }
        const vendor = await VendorModel.findById(vendorID);
        if (!vendor) {
            Errors.push({ field: "Vendor", message: `No Vendor with ${vendorID} found!` });
        }
        const application = await ApplicationModel.findById(appID);
        if (!application) {
            Errors.push({ field: "Application", message: `No Application with ${appID} found!` });
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
