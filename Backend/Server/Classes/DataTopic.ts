import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import ErrorMessage from "../Types/ErrorMessage";
import { BaseNameComponent } from "./BaseNameComponent";

@ObjectType()
export default class DataTopic extends BaseNameComponent {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    public static override async CheckShortnameAvailable(shortName: String): Promise<DataTopicResponse | undefined> {
        const exist = await DataTopicModel.find({ shortName });
        if (exist.length > 0) {
            return {
                Errors: [{ field: "shortName", message: `${shortName} already taken` }],
            };
        }
        return;
    }
}

@ObjectType()
export class DataTopicResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => DataTopic, { nullable: true })
    DataTopic?: DataTopic;
}

export const DataTopicModel = getModelForClass(DataTopic);
