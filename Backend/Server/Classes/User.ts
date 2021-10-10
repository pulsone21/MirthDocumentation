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
  @Property({ unique: true })
  Username!: string;

  @Property()
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

  public static ValidateInput(options: UsernamePasswordInput): UserResponse | undefined {
    if (!options.username) {
      return {
        Errors: [
          {
            field: "username",
            message: "Username is empty",
          },
        ],
      };
    } else if (options.username.length < 3) {
      return {
        Errors: [
          {
            field: "username",
            message: "Username musst be longer then 3 characters",
          },
        ],
      };
    }

    if (!options.password) {
      return {
        Errors: [
          {
            field: "password",
            message: "Password is empty",
          },
        ],
      };
    } else if (options.password.length < 5) {
      return {
        Errors: [
          {
            field: "password",
            message: "Password musst be longer then 5 characters",
          },
        ],
      };
    }
    return;
  }
}

@ObjectType()
export class UserResponse {
  @Field(() => [ErrorMessage], { nullable: true })
  Errors?: ErrorMessage[];

  @Field(() => User, { nullable: true })
  User?: User;
}

export const UserModel = getModelForClass(User);
