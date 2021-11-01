import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import Application from "./Application";
import ConnectionType from "./ConnectionType";
import DataArea from "./DataArea";
import DataTopic from "./DataTopic";
import DataType from "./DataType";
import Vendor from "./Vendor";
import ErrorMessage from "../Types/ErrorMessage";

export enum Environment {
    POC = "Poc",
    TST = "Tst",
    PRD = "Prd",
}

registerEnumType(Environment, {
    name: "Environment",
});

@ObjectType()
export default class ChannelName {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    public name: String;

    @Property({ ref: DataType })
    @Field((_type) => DataType)
    dataType: Ref<DataType>;

    @Property({ ref: DataTopic })
    @Field((_type) => DataTopic)
    dataTopic: Ref<DataTopic>;

    @Property({ ref: DataArea })
    @Field((_type) => DataArea)
    dataArea: Ref<DataArea>;

    @Property({ ref: ConnectionType })
    @Field((_type) => ConnectionType)
    connectionType: Ref<ConnectionType>;

    @Property({ ref: Vendor })
    @Field((_type) => Vendor)
    vendor: Ref<Vendor>;

    @Property({ ref: Application })
    @Field((_type) => Application)
    application: Ref<Application>;

    @Property({ enum: Environment })
    @Field((_type) => Environment)
    environment: Environment;

    @Property()
    @Field(() => Int)
    version: Number;

    @Property({ match: /\d{5}/ })
    @Field()
    channelNumber: string;
}

@ObjectType()
export class ChannelNameResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => ChannelName, { nullable: true })
    ChannelName?: ChannelName;
}

export const ChannelNameModel = getModelForClass(ChannelName);
