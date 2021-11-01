import { ObjectId } from "mongoose";
import DataArea, { DataAreaModel, DataAreaResponse } from "../../Classes/DataArea";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";

@Resolver(DataArea)
export default class DataAreaResolver {
    @Query(() => [DataArea])
    async GetAllDataAreas(): Promise<DataArea[]> {
        return await DataAreaModel.find({});
    }

    @Query(() => DataAreaResponse)
    async GetDataAreaByShortName(@Arg("shortName") shortName: String): Promise<DataAreaResponse> {
        const DataArea = await DataAreaModel.findOne({ shortName });
        if (!DataArea) {
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
                DataArea,
            };
        }
    }

    @Query(() => DataAreaResponse)
    async GetDataAreaByLongName(@Arg("longName") longName: String): Promise<DataAreaResponse> {
        const DataArea = await DataAreaModel.findOne({ longName });
        if (!DataArea) {
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
                DataArea,
            };
        }
    }

    @Query(() => DataAreaResponse)
    async GetDataAreaByID(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<DataAreaResponse> {
        const DataArea = await DataAreaModel.findOne({ id });
        if (!DataArea) {
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
                DataArea,
            };
        }
    }

    @Mutation(() => DataAreaResponse)
    async CreateDataArea(
        @Arg("shortName", () => String, { nullable: false }) shortName: String,
        @Arg("longName", () => String, { nullable: false }) longName: String
    ): Promise<DataAreaResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) {
            return validation;
        }

        if (!longName) {
            return {
                Errors: [{ field: "longName", message: "please enter a Longname" }],
            };
        }

        const DataArea = await DataAreaModel.create({ shortName, longName });
        if (!DataArea) {
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
            DataArea,
        };
    }
}

async function BaseValidation(shortName: String): Promise<DataAreaResponse | undefined> {
    const validation = DataArea.CheckShortName(shortName);
    if (validation) {
        return validation;
    }
    const exist = DataAreaModel.CheckShortnameAvailable(shortName);
    if (exist) {
        return exist;
    }
    return;
}
