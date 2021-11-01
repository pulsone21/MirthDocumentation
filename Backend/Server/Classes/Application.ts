import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import ErrorMessage from "../Types/ErrorMessage";
import { Field, ObjectType } from "type-graphql";
import Vendor from "./Vendor";
import { BaseNameComponent } from "./BaseNameComponent";

@ObjectType()
export default class Application extends BaseNameComponent {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    shortName: String;

    @Field()
    @Property()
    longName: String;

    @Property({ ref: Vendor })
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
}

@ObjectType()
export class ApplicationResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
    @Field(() => Application, { nullable: true })
    Application?: Application;
}

@ObjectType()
export class BaseApplication {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ unique: true })
    shortName: String;

    @Field()
    @Property()
    longName: String;
}

export const ApplicationModel = getModelForClass(Application);
