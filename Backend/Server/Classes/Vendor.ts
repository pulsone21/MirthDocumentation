import { getModelForClass, prop as Property } from "@typegoose/typegoose";
// import { MaxLength } from "class-validator";
import { ObjectId } from "mongodb";
import ErrorMessage from "../Types/ErrorMessage";
import { Field, ObjectType } from "type-graphql";
import { BaseNameComponent } from "./BaseNameComponent";

@ObjectType()
export default class Vendor extends BaseNameComponent {
    constructor() {
        super();
    }
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    public shortName!: String;

    @Field()
    @Property()
    public longName!: String;

    //@Field((_type) => [Application])
    // @Property({ type: ObjectId, ref: () => Application })
    // public applications: Ref<Application>[];

    public static override async CheckShortnameAvailable(shortName: String): Promise<VendorResponse | undefined> {
        const exist = await VendorModel.find({ shortName });
        if (exist.length > 0) return { Errors: [{ field: "shortName", message: `${shortName} already taken` }] };
        return;
    }
}
@ObjectType()
export class VendorResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => Vendor, { nullable: true })
    Vendor?: Vendor;
}

export const VendorModel = getModelForClass(Vendor);
