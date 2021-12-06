import { ObjectId } from "bson";
import { Field, ObjectType } from "type-graphql";
import ChannelName from "./ChannelName";
import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";

enum ConnectorType {
    SOURCE,
    DESTINATION,
}

@ObjectType()
export default class Connector {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    mirthId: String;

    @Field()
    @Property()
    name: Ref<ChannelName>;

    @Field()
    @Property()
    path: String;

    @Field()
    @Property()
    server: Number;

    @Property({ type: ObjectId, ref: () => ChannelName, default: [] })
    @Field((_type) => ChannelName)
    sources: Ref<ChannelName>[];

    @Property({ type: ObjectId, ref: () => ChannelName, default: [] })
    @Field((_type) => ChannelName)
    destinations: Ref<ChannelName>[];

    @Field()
    @Property()
    enabled: Boolean;

    @Field()
    @Property()
    file: String;

    @Field()
    @Property()
    description: String;

    @Field()
    @Property()
    tags: String[] | null;

    @Field()
    @Property()
    connector_type: ConnectorType;

    AddDestination(channelName: ChannelName) {
        this.destinations.push(channelName);
    }
    AddSource(channelName: ChannelName) {
        this.sources.push(channelName);
    }
    RemoveDestination(channelName: ChannelName) {
        let tmpArray: Ref<ChannelName, Types.ObjectId | undefined>[] = [];
        this.destinations.forEach((el) => {
            if (el?._id != channelName._id) {
                if (el) tmpArray.push(el);
            }
        });
        this.destinations = tmpArray;
    }
    RemoveSource(channelName: ChannelName) {
        let tmpArray: Ref<ChannelName, Types.ObjectId | undefined>[] = [];
        this.sources.forEach((el) => {
            if (el?._id != channelName._id) {
                if (el) tmpArray.push(el);
            }
        });
        this.sources = tmpArray;
    }
}

export const ConnectorModel = getModelForClass(Connector);
