import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import ErrorMessage from "../Types/ErrorMessage";
import { BaseNameComponent } from "./BaseNameComponent";
@ObjectType()
export default class DataArea extends BaseNameComponent {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    public static override async CheckShortnameAvailable(shortName: String): Promise<DataAreaResponse | undefined> {
        const exist = await DataAreaModel.find({ shortName });
        if (exist.length > 0) {
            return {
                Errors: [{ field: "shortName", message: `${shortName} already taken` }],
            };
        }
        return;
    }
}
@ObjectType()
export class DataAreaResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => DataArea, { nullable: true })
    DataArea?: DataArea;
}
export const DataAreaModel = getModelForClass(DataArea);
