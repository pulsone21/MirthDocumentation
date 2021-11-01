import User, { UserModel, UsernamePasswordInput, UserResponse } from "../../Classes/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { MyContext } from "Server/Types/MyContext";
require("dotenv").config();

@Resolver(User)
export default class UserResolver {
    @Query(() => User, { nullable: true })
    Me(@Ctx() { req }: MyContext) {
        // console.log(req.session);
        if (!req.session.userId) {
            return null;
        }
        const id = req.session.userId;
        console.log(id);
        return UserModel.findOne({ id });
    }

    @Mutation(() => UserResponse)
    async Login(@Arg("options") options: UsernamePasswordInput, @Ctx() { req }: MyContext): Promise<UserResponse> {
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

        console.log("setting Coockie in Session:");
        // console.log(req);
        req.session.userId = User.id;

        console.log("Cookie set");
        console.log(req.session);

        return {
            User,
        };
    }

    //TODO rebuild to just create an User as admin person, we shouldnt allow self regisiter
    @Mutation(() => UserResponse)
    async RegisterUser(@Arg("options") options: UsernamePasswordInput, @Ctx() { req }: MyContext): Promise<UserResponse> {
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

        req.session.userId = User.id;

        return { User };
    }

    @Mutation(() => Boolean)
    async LogOut(@Ctx() { req, res }: MyContext): Promise<Boolean> {
        return await new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(process.env.SESSION_COOKIE_NAME ? process.env.SESSION_COOKIE_NAME : "uid");
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }
}
