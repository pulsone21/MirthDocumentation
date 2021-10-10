import User, { UserModel, UsernamePasswordInput, UserResponse } from "../../Classes/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";

@Resolver(User)
export default class UserResolver {
  @Query(() => UserResponse)
  async Login(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
    const User = await UserModel.findOne({ Username: options.username });

    if (!User) {
      return {
        Errors: [
          {
            field: "Username",
            message: "Username dont exist!",
          },
        ],
      };
    }

    if (!(await argon2.verify(User.Password, options.password))) {
      return {
        Errors: [
          {
            field: "Password",
            message: "Password is wrong",
          },
        ],
      };
    }

    return {
      User,
    };
  }

  @Mutation(() => UserResponse)
  async RegisiterUser(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
    const hasedPassword = await argon2.hash(options.password);
    const User = await UserModel.create({ username: options.username, password: hasedPassword });
    if (!User) {
      return {
        Errors: [
          {
            field: "Username",
            message: "Something Went Wrong!",
          },
        ],
      };
    }
    return { User };
  }
}
