import { ObjectId } from "mongoose";
import DataTopic, { DataTopicModel, DataTopicResponse } from "../../Classes/DataTopic";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(DataTopic)
export default class DataTopicResolver {
    @Query(() => [DataTopic])
    async GetAllDataTopics(): Promise<DataTopic[]> {
        return await DataTopicModel.find();
    }

    @Query(() => DataTopicResponse)
    async GetDataTopicByShortName(@Arg("shortName") shortName: String): Promise<DataTopicResponse> {
        const DataTopic = await DataTopicModel.findOne({ shortName });
        if (!DataTopic) {
            return {
                Errors: [
                    {
                        field: "shortName",
                        message: `No DataTopic found with Shortname: ${shortName}`,
                    },
                ],
            };
        } else {
            return {
                DataTopic,
            };
        }
    }

    @Query(() => DataTopicResponse)
    async GetDataTopicByLongName(@Arg("longName") longName: String): Promise<DataTopicResponse> {
        const DataTopic = await DataTopicModel.findOne({ longName });
        if (!DataTopic) {
            return {
                Errors: [
                    {
                        field: "longName",
                        message: `No DataTopic found with Longname: ${longName}`,
                    },
                ],
            };
        } else {
            return {
                DataTopic,
            };
        }
    }

    @Query(() => DataTopicResponse)
    async GetDataTopicByID(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<DataTopicResponse> {
        const DataTopic = await DataTopicModel.findOne({ id });
        if (!DataTopic) {
            return {
                Errors: [
                    {
                        field: "ID",
                        message: `No DataTopic found with ID: ${id}`,
                    },
                ],
            };
        } else {
            return {
                DataTopic,
            };
        }
    }

    @Mutation(() => DataTopicResponse)
    async CreateDataTopic(
        @Arg("shortName", () => String, { nullable: false }) shortName: String,
        @Arg("longName", () => String, { nullable: false }) longName: String
    ): Promise<DataTopicResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) {
            return validation;
        }

        if (!longName) {
            return {
                Errors: [{ field: "longName", message: "please enter a Longname" }],
            };
        }

        const DataTopic = await DataTopicModel.create({ shortName, longName });
        if (!DataTopic) {
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
            DataTopic,
        };
    }
}

async function BaseValidation(shortName: String): Promise<DataTopicResponse | undefined> {
    const validation = DataTopic.CheckShortName(shortName);
    if (validation) {
        return validation;
    }
    const exist = DataTopicModel.CheckShortnameAvailable(shortName);
    if (exist) {
        return exist;
    }
    return;
}
