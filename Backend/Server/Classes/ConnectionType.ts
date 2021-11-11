import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import ErrorMessage from "../Types/ErrorMessage";
@ObjectType()
export default class ConnectionType {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true, minlength: 5, maxlength: 5 })
    shortName: String;

    @Field()
    @Property()
    longName: String;
}

@ObjectType()
export class ConnectionTypeResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => ConnectionType, { nullable: true })
    ConnectionType?: ConnectionType;
}
export const ConnectionTypeModel = getModelForClass(ConnectionType);
