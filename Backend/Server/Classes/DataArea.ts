import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class DataArea {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ maxlength: 3 })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    constructor(shortName: string, longName: string) {
        this.shortName = shortName;
        this.longName = longName;
    }
}

export const DataAreaModel = getModelForClass(DataArea);
