import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import ErrorMessage from "../Types/ErrorMessage";
import { Field, ObjectType } from "type-graphql";
import Vendor from "./Vendor";
import { BaseNameComponent } from "./BaseNameComponent";
import { unlink } from "fs";
@ObjectType()
export default class Application extends BaseNameComponent {
    constructor() {
        super();
    }

    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    @Field({ nullable: true })
    @Property({ require: false })
    logoUrl?: String;

    @Property({ type: ObjectId, ref: () => Vendor })
    @Field((_type) => Vendor)
    vendor: Ref<Vendor>;

    public static override async CheckShortnameAvailable(shortName: String): Promise<ApplicationResponse | undefined> {
        const exist = await ApplicationModel.find({ shortName });
        if (exist.length > 0) {
            return {
                Errors: [{ field: "shortName", message: `${shortName} already taken` }],
            };
        }
        return;
    }

    public static DeleteMyLogo(url: string): Boolean {
        unlink(url, (err) => {
            if (err) return false;
            return true;
        });
        return true;
    }
}

@ObjectType()
export class ApplicationResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => Application, { nullable: true })
    Application?: Application;
}

export const ApplicationModel = getModelForClass(Application);
