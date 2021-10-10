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
exports.ApplicationModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const Vendor_1 = __importDefault(require("./Vendor"));
let Application = class Application {
    constructor(shortName, longName, vendor) {
        this.shortName = shortName;
        this.longName = longName;
        vendor ? (this.vendor = vendor) : null;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Application.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ maxlength: 3 }),
    __metadata("design:type", String)
], Application.prototype, "shortName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Application.prototype, "longName", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: Vendor_1.default }),
    (0, type_graphql_1.Field)((_type) => Vendor_1.default),
    __metadata("design:type", Object)
], Application.prototype, "vendor", void 0);
Application = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String, String, Vendor_1.default])
], Application);
exports.default = Application;
exports.ApplicationModel = (0, typegoose_1.getModelForClass)(Application);
//# sourceMappingURL=Application.js.map