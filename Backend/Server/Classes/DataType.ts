import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import ErrorMessage from "../Types/ErrorMessage";
import { BaseNameComponent } from "./BaseNameComponent";

@ObjectType()
export default class DataType extends BaseNameComponent {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property()
    shortName: String;

    @Field()
    @Property()
    longName: String;

    public static override async CheckShortnameAvailable(shortName: String): Promise<DataTypeResponse | undefined> {
        const exist = await DataTypeModel.find({ shortName });
        if (exist.length > 0) {
            return {
                Errors: [{ field: "shortName", message: `${shortName} already taken` }],
            };
        }
        return;
    }
}

@ObjectType()
export class DataTypeResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => DataType, { nullable: true })
    DataType?: DataType;
}

export const DataTypeModel = getModelForClass(DataType);
