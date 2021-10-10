import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class ConnectionType {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ maxlength: 5, minlength: 5 })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    constructor(shortName: string, longName: string) {
        this.shortName = shortName;
        this.longName = longName;
    }
}

export const ConnectionTypeModel = getModelForClass(ConnectionType);
