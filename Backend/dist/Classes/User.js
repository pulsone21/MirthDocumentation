"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserResponse = exports.UsernamePasswordInput = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const ErrorMessage_1 = __importDefault(require("../Types/ErrorMessage"));
const type_graphql_1 = require("type-graphql");
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ minlength: 2, unique: true }),
    __metadata("design:type", String)
], User.prototype, "Username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ minlength: 5 }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.default = User;
let UsernamePasswordInput = class UsernamePasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
UsernamePasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], UsernamePasswordInput);
exports.UsernamePasswordInput = UsernamePasswordInput;
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ErrorMessage_1.default], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "Errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserResponse.prototype, "User", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
//# sourceMappingURL=User.js.map