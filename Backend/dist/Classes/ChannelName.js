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
exports.ChannelNameModel = exports.Environment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const Application_1 = __importDefault(require("./Application"));
const ConnectionType_1 = __importDefault(require("./ConnectionType"));
const DataArea_1 = __importDefault(require("./DataArea"));
const DataTopic_1 = __importDefault(require("./DataTopic"));
const DataType_1 = __importDefault(require("./DataType"));
const Vendor_1 = __importDefault(require("./Vendor"));
var Environment;
(function (Environment) {
    Environment["POC"] = "Poc";
    Environment["TST"] = "Tst";
    Environment["PRD"] = "Prd";
})(Environment = exports.Environment || (exports.Environment = {}));
(0, type_graphql_1.registerEnumType)(Environment, {
    name: "Environment",
});
let ChannelName = class ChannelName {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", mongodb_1.ObjectId)
], ChannelName.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ChannelName.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: DataType_1.default }),
    (0, type_graphql_1.Field)((_type) => DataType_1.default),
    __metadata("design:type", Object)
], ChannelName.prototype, "dataType", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: DataTopic_1.default }),
    (0, type_graphql_1.Field)((_type) => DataTopic_1.default),
    __metadata("design:type", Object)
], ChannelName.prototype, "dataTopic", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: DataArea_1.default }),
    (0, type_graphql_1.Field)((_type) => DataArea_1.default),
    __metadata("design:type", Object)
], ChannelName.prototype, "dataArea", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: ConnectionType_1.default }),
    (0, type_graphql_1.Field)((_type) => ConnectionType_1.default),
    __metadata("design:type", Object)
], ChannelName.prototype, "connectionType", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: Vendor_1.default }),
    (0, type_graphql_1.Field)((_type) => Vendor_1.default),
    __metadata("design:type", Object)
], ChannelName.prototype, "vendor", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: Application_1.default }),
    (0, type_graphql_1.Field)((_type) => Application_1.default),
    __metadata("design:type", Object)
], ChannelName.prototype, "application", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: Environment }),
    (0, type_graphql_1.Field)((_type) => Environment),
    __metadata("design:type", String)
], ChannelName.prototype, "environment", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ChannelName.prototype, "version", void 0);
__decorate([
    (0, typegoose_1.prop)({ match: /\d{5}/ }),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ChannelName.prototype, "channelNumber", void 0);
ChannelName = __decorate([
    (0, type_graphql_1.ObjectType)()
], ChannelName);
exports.default = ChannelName;
exports.ChannelNameModel = (0, typegoose_1.getModelForClass)(ChannelName);
//# sourceMappingURL=ChannelName.js.map