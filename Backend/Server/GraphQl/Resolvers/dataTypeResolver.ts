import { ObjectId } from "mongoose";
import DataType, { DataTypeModel, DataTypeResponse } from "../../Classes/DataType";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
@Resolver(DataType)
export default class DataTypeResolver {
    @Query(() => [DataType])
    async GetAllDataTypes(): Promise<DataType[]> {
        return await DataTypeModel.find({});
    }
    @Query(() => DataTypeResponse)
    async GetDataTypeByShortName(@Arg("shortName") shortName: String): Promise<DataTypeResponse> {
        const DataType = await DataTypeModel.find({ shortName });
        if (!DataType) return { Errors: [{ field: "shortName", message: `No DataType found with Shortname: ${shortName}` }] };
        if (DataType.length > 1) return { Errors: [{ field: "shortName", message: `More then one DataType found with Shortname: ${shortName}` }] };
        return { DataType: DataType[0] };
    }

    @Query(() => DataTypeResponse)
    async GetDataTypeByLongName(@Arg("longName") longName: String): Promise<DataTypeResponse> {
        const DataType = await DataTypeModel.find({ longName });
        if (!DataType) return { Errors: [{ field: "longName", message: `No DataType found with Longname: ${longName}` }] };
        if (DataType.length > 1) return { Errors: [{ field: "longName", message: `More then one DataType found with Longname: ${longName}` }] };
        return { DataType: DataType[0] };
    }

    @Query(() => DataTypeResponse)
    async GetDataTypeByID(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<DataTypeResponse> {
        const DataType = await DataTypeModel.findOne({ id });
        if (!DataType) return { Errors: [{ field: "ID", message: `No DataType found with ID: ${id}` }] };
        return { DataType };
    }

    @Mutation(() => DataTypeResponse)
    async CreateDataType(
        @Arg("shortName", () => String, { nullable: false }) shortName: String,
        @Arg("longName", () => String, { nullable: false }) longName: String
    ): Promise<DataTypeResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) return validation;
        if (!longName) return { Errors: [{ field: "longName", message: "please enter a Longname" }] };
        const DataType = await DataTypeModel.create({ shortName, longName });
        if (!DataType) return { Errors: [{ field: "shortName", message: "Somehting went wrong!" }] };
        return { DataType };
    }
}

async function BaseValidation(shortName: String): Promise<DataTypeResponse | undefined> {
    const validation = DataType.CheckShortName(shortName);
    if (validation) return validation;
    const exist = DataTypeModel.CheckShortnameAvailable(shortName);
    if (exist) return exist;
    return;
}
