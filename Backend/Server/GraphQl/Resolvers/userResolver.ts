import User, { UserModel, UsernamePasswordInput, UserResponse } from "../../Classes/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => UserResponse)
  async Login(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
    const validate = UsernamePasswordInput.ValidateInput(options);
    if (validate) {
      return validate;
    }
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
  async RegisterUser(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
    const validate = UsernamePasswordInput.ValidateInput(options);
    const userCheck = await UserModel.findOne({ Username: options.username });
    if (validate) {
      return validate;
    }
    if (userCheck) {
      return {
        Errors: [
          {
            field: "username",
            message: "Username already exist!",
          },
        ],
      };
    }

    const hasedPassword = await argon2.hash(options.password);
    const User = await UserModel.create({ Username: options.username, Password: hasedPassword });
    if (!User) {
      return {
        Errors: [
          {
            field: "Username",
            message: "Wasn't able to create the User, see Server Log",
          },
        ],
      };
    }
    return { User };
  }
}
