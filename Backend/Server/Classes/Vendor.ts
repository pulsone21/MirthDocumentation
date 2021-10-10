import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { WhatIsIt } from "@typegoose/typegoose/lib/internal/constants";
// import { MaxLength } from "class-validator";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import Application from "./Application";

@ObjectType()
export default class Vendor {
    @Field()
    readonly _id: ObjectId;

    @Field()
    // @MaxLength(3)
    @Property()
    public shortName: String;

    @Field()
    @Property()
    public longName: String;

    @Field((_type) => [Application])
    @Property({ ref: () => "Application" }, WhatIsIt.ARRAY)
    public applications: Ref<Application>[];

    // constructor(shortName: string, longName: string) {
    //     this.shortName = shortName;
    //     this.longName = longName;
    //     this.applications = new Array<Application>();
    // }
}

export const VendorModel = getModelForClass(Vendor);
