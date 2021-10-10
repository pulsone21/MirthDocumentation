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
const DataArea_1 = __importStar(require("../../Classes/DataArea"));
const type_graphql_1 = require("type-graphql");
const ObjectId_1 = require("../myScalars/ObjectId");
let DataAreaResolver = class DataAreaResolver {
    async GetAllDataAreas() {
        try {
            return await DataArea_1.DataAreaModel.find({});
        }
        catch (err) {
            throw new Error("No DataArea found in the DB!");
        }
    }
    async GetDataAreaByID(id) {
        try {
            return await DataArea_1.DataAreaModel.findById(id);
        }
        catch (err) {
            throw new Error("No DataArea found in the DB!");
        }
    }
    async GetDataAreaByShortName(ShortName) {
        try {
            return await DataArea_1.DataAreaModel.findOne({ shortName: ShortName });
        }
        catch (err) {
            throw new Error("No DataArea found in the DB!");
        }
    }
    async GetDataAreaByLongName(LongName) {
        try {
            return await DataArea_1.DataAreaModel.findOne({ longName: LongName });
        }
        catch (err) {
            throw new Error("No DataArea found in the DB!");
        }
    }
    async CreateDataArea(shortName, longName) {
        const dataArea = await DataArea_1.DataAreaModel.create({ shortName, longName });
        return dataArea;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [DataArea_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataAreaResolver.prototype, "GetAllDataAreas", null);
__decorate([
    (0, type_graphql_1.Query)(() => DataArea_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataAreaResolver.prototype, "GetDataAreaByID", null);
__decorate([
    (0, type_graphql_1.Query)(() => DataArea_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataAreaResolver.prototype, "GetDataAreaByShortName", null);
__decorate([
    (0, type_graphql_1.Query)(() => DataArea_1.default),
    __param(0, (0, type_graphql_1.Arg)("longName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataAreaResolver.prototype, "GetDataAreaByLongName", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DataArea_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName", () => String, { nullable: false })),
    __param(1, (0, type_graphql_1.Arg)("longName", () => String, { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], DataAreaResolver.prototype, "CreateDataArea", null);
DataAreaResolver = __decorate([
    (0, type_graphql_1.Resolver)(DataArea_1.default)
], DataAreaResolver);
exports.default = DataAreaResolver;
//# sourceMappingURL=dataAreaResolver.js.map