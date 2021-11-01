import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class ErrorMessage {
    @Field({ nullable: false })
    field: string;

    @Field({ nullable: false })
    message: string;

    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }
}
