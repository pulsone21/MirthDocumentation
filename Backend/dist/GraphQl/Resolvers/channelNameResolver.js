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
const ChannelName_1 = __importStar(require("../../Classes/ChannelName"));
const type_graphql_1 = require("type-graphql");
const ObjectId_1 = require("../myScalars/ObjectId");
const DataType_1 = require("../../Classes/DataType");
const DataTopic_1 = require("../../Classes/DataTopic");
const DataArea_1 = require("../../Classes/DataArea");
const ConnectionType_1 = require("../../Classes/ConnectionType");
const Application_1 = require("../../Classes/Application");
const Vendor_1 = require("../../Classes/Vendor");
let ChannelNameResolver = class ChannelNameResolver {
    async GetAllChannelNames() {
        try {
            return await ChannelName_1.ChannelNameModel.find({});
        }
        catch (err) {
            throw new Error("No ChannelName found in the DB!");
        }
    }
    async GetChannelNameByID(id) {
        try {
            return await ChannelName_1.ChannelNameModel.findById(id);
        }
        catch (err) {
            throw new Error("No ChannelName found in the DB!");
        }
    }
    async CreateChannelName(dataTypeID, dataTopicID, dataAreaID, conTypeID, vendorID, appID, environment, version, channelNumber) {
        const dataType = await DataType_1.DataTypeModel.findById(dataTypeID);
        const dataTopic = await DataTopic_1.DataTopicModel.findById(dataTopicID);
        const dataArea = await DataArea_1.DataAreaModel.findById(dataAreaID);
        const connectionType = await ConnectionType_1.ConnectionTypeModel.findById(conTypeID);
        const vendor = await Vendor_1.VendorModel.findById(vendorID);
        const application = await Application_1.ApplicationModel.findById(appID);
        if (dataType && dataTopic && dataArea && connectionType && vendor && application) {
            const channelName = await ChannelName_1.ChannelNameModel.create({
                dataType,
                dataTopic,
                dataArea,
                connectionType,
                vendor,
                application,
                environment,
                version,
                channelNumber,
            });
            channelName.name = `${dataArea.shortName}${dataTopic.shortName}_${application.shortName}${vendor.shortName}_${environment}_${version}_${channelNumber}_${connectionType.shortName}`;
            channelName.save();
            if (channelName) {
                return channelName;
            }
            else {
                throw new Error("Channelname couldnt be created");
            }
        }
        else {
            throw new Error("One of the Related Objects where not found!");
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [ChannelName_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelNameResolver.prototype, "GetAllChannelNames", null);
__decorate([
    (0, type_graphql_1.Query)(() => ChannelName_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelNameResolver.prototype, "GetChannelNameByID", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ChannelName_1.default),
    __param(0, (0, type_graphql_1.Arg)("dataTypeID", () => ObjectId_1.ObjectIdScalar)),
    __param(1, (0, type_graphql_1.Arg)("dataTopicID", () => ObjectId_1.ObjectIdScalar)),
    __param(2, (0, type_graphql_1.Arg)("dataAreaID", () => ObjectId_1.ObjectIdScalar)),
    __param(3, (0, type_graphql_1.Arg)("conTypeID", () => ObjectId_1.ObjectIdScalar)),
    __param(4, (0, type_graphql_1.Arg)("vendorID", () => ObjectId_1.ObjectIdScalar)),
    __param(5, (0, type_graphql_1.Arg)("appID", () => ObjectId_1.ObjectIdScalar)),
    __param(6, (0, type_graphql_1.Arg)("env", (_) => ChannelName_1.Environment)),
    __param(7, (0, type_graphql_1.Arg)("version", (_) => type_graphql_1.Int)),
    __param(8, (0, type_graphql_1.Arg)("channelNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, String, Number, String]),
    __metadata("design:returntype", Promise)
], ChannelNameResolver.prototype, "CreateChannelName", null);
ChannelNameResolver = __decorate([
    (0, type_graphql_1.Resolver)(ChannelName_1.default)
], ChannelNameResolver);
exports.default = ChannelNameResolver;
//# sourceMappingURL=channelNameResolver.js.map