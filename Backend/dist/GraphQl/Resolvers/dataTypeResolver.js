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
const DataType_1 = __importStar(require("../../Classes/DataType"));
const type_graphql_1 = require("type-graphql");
const ObjectId_1 = require("../myScalars/ObjectId");
let DataTypeResolver = class DataTypeResolver {
    async GetAllDataTypes() {
        try {
            return await DataType_1.DataTypeModel.find({});
        }
        catch (err) {
            throw new Error("No DataType found in the DB!");
        }
    }
    async GetDataTypeByID(id) {
        try {
            return await DataType_1.DataTypeModel.findById(id);
        }
        catch (err) {
            throw new Error("No DataType found in the DB!");
        }
    }
    async GetDataTypeByShortName(ShortName) {
        try {
            return await DataType_1.DataTypeModel.findOne({ shortName: ShortName });
        }
        catch (err) {
            throw new Error("No DataType found in the DB!");
        }
    }
    async GetDataTypeByLongName(LongName) {
        try {
            return await DataType_1.DataTypeModel.findOne({ longName: LongName });
        }
        catch (err) {
            throw new Error("No DataType found in the DB!");
        }
    }
    async CreateDataType(shortName, longName) {
        const dataType = await DataType_1.DataTypeModel.create({ shortName, longName });
        return dataType;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [DataType_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataTypeResolver.prototype, "GetAllDataTypes", null);
__decorate([
    (0, type_graphql_1.Query)(() => DataType_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataTypeResolver.prototype, "GetDataTypeByID", null);
__decorate([
    (0, type_graphql_1.Query)(() => DataType_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataTypeResolver.prototype, "GetDataTypeByShortName", null);
__decorate([
    (0, type_graphql_1.Query)(() => DataType_1.default),
    __param(0, (0, type_graphql_1.Arg)("longName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataTypeResolver.prototype, "GetDataTypeByLongName", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DataType_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName", () => String, { nullable: false })),
    __param(1, (0, type_graphql_1.Arg)("longName", () => String, { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], DataTypeResolver.prototype, "CreateDataType", null);
DataTypeResolver = __decorate([
    (0, type_graphql_1.Resolver)(DataType_1.default)
], DataTypeResolver);
exports.default = DataTypeResolver;
//# sourceMappingURL=dataTypeResolver.js.map