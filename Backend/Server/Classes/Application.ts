import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import Vendor from "./Vendor";

@ObjectType()
export default class Application {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ maxlength: 3 })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    @Property({ ref: Vendor })
    @Field((_type) => Vendor)
    vendor: Ref<Vendor>;

    constructor(shortName: string, longName: string, vendor?: Vendor) {
        this.shortName = shortName;
        this.longName = longName;
        vendor ? (this.vendor = vendor) : null;
    }
}

export const ApplicationModel = getModelForClass(Application);
