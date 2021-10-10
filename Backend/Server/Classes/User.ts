import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import ErrorMessage from "../Types/ErrorMessage";
import { Field, InputType, ObjectType } from "type-graphql";

// @pre<User>("save", function() {
//     const newDate = new Date();
//     this.updatedAt = newDate;
// })

@ObjectType()
export default class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ minlength: 2, unique: true })
  Username!: string;

  @Field()
  @Property({ minlength: 5 })
  Password!: string;

  //   @Field(() => string)
  //   @Property()
  //   createdAt: Date;

  //   @Field(() => string)
  //   @Property()
  //   updatedAt: Date;
}

@InputType()
export class UsernamePasswordInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorMessage], { nullable: true })
  Errors?: ErrorMessage[];

  @Field(() => User, { nullable: true })
  User?: User;
}

export const UserModel = getModelForClass(User);
