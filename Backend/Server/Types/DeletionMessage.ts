import { Field, ObjectType } from "type-graphql";
import ErrorMessage from "./ErrorMessage";

@ObjectType()
export default class DeletionMessage {
    @Field({ nullable: true })
    deletion?: Boolean;

    @Field(() => [ErrorMessage], { nullable: true })
    Errors?: ErrorMessage[];
}
