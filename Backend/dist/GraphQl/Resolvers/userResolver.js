"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importStar(require("../../Classes/User"));
const type_graphql_1 = require("type-graphql");
const argon2 = __importStar(require("argon2"));
let UserResolver = class UserResolver {
    async Login(options) {
        const User = await User_1.UserModel.findOne({ Username: options.username });
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
    async RegisiterUser(options) {
        const hasedPassword = await argon2.hash(options.password);
        const User = await User_1.UserModel.create({ username: options.username, password: hasedPassword });
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
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.UsernamePasswordInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.UsernamePasswordInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "RegisiterUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.default)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=userResolver.js.map