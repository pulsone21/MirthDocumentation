import * as argon2 from "argon2";
import UserResolver from "../GraphQl/Resolvers/userResolver";
import { UserModel } from "../Classes/User";

export async function CheckAdminUser(): Promise<undefined> {
    console.log("checking for admin");
    let check = await UserResolver.AdminPresent();
    if (!check) {
        console.log("no Admin found!");
        const plainPw = process.env.ADMIN_PASSWORD;
        if (!plainPw) {
            console.error("couldnt create ADMIN-User, Admin default pw not given");
            return;
        }
        const hashedPassword = await argon2.hash(plainPw);
        let admin = await UserModel.create({ Username: "Admin", Password: hashedPassword });
        console.log("user created");
        if (!admin) {
            console.error("Something went wrong in creating admin");
            return;
        }
        return;
    }
    console.log(check);
    return;
}
