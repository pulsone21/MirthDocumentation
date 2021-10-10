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
const type_graphql_1 = require("type-graphql");
const ObjectId_1 = require("../myScalars/ObjectId");
const Vendor_1 = __importStar(require("../../Classes/Vendor"));
const Application_1 = require("../../Classes/Application");
let VendorResolver = class VendorResolver {
    async GetAllVendors() {
        try {
            return await Vendor_1.VendorModel.find({});
        }
        catch (err) {
            throw new Error("No Vendors found in the DB!");
        }
    }
    async GetVendorByID(id) {
        try {
            return await Vendor_1.VendorModel.findById(id);
        }
        catch (err) {
            throw new Error("No Vendor found with ID: " + id);
        }
    }
    async GetVendorShortName(ShortName) {
        try {
            return await Vendor_1.VendorModel.findOne({ shortName: ShortName });
        }
        catch (err) {
            throw new Error("No Vendor found in the DB!");
        }
    }
    async GetVendorByLongName(LongName) {
        try {
            return await Vendor_1.VendorModel.findOne({ longName: LongName });
        }
        catch (err) {
            throw new Error("No Vendor found in the DB!");
        }
    }
    async CreateVendor(shortName, longName) {
        try {
            return await Vendor_1.VendorModel.create({ shortName, longName });
        }
        catch (err) {
            throw new Error("Vendor could not be created");
        }
    }
    async UpdateVendor(id, shortName, longName) {
        const vend = await Vendor_1.VendorModel.findById(id);
        if (vend) {
            if (shortName != undefined) {
                vend.shortName = shortName;
                vend.save();
            }
            if (longName != undefined) {
                vend.longName = longName;
                vend.save();
            }
            return vend;
        }
        else {
            return null;
        }
    }
    async AddApplikationToVendor(vendId, appId) {
        const vend = await Vendor_1.VendorModel.findById(vendId);
        const app = await Application_1.ApplicationModel.findById(appId);
        if (vend && app) {
            if (vend.applications.some((e) => (e === null || e === void 0 ? void 0 : e._id.toString()) === vendId.toString())) {
                throw new Error(`Application with ID: ${appId} allready in the List from Vendor with ID: ${vendId}`);
            }
            else {
                vend.applications.push(app);
                vend.save();
                return vend;
            }
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Vendor_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "GetAllVendors", null);
__decorate([
    (0, type_graphql_1.Query)(() => Vendor_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "GetVendorByID", null);
__decorate([
    (0, type_graphql_1.Query)(() => Vendor_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "GetVendorShortName", null);
__decorate([
    (0, type_graphql_1.Query)(() => Vendor_1.default),
    __param(0, (0, type_graphql_1.Arg)("longName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "GetVendorByLongName", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Vendor_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName")),
    __param(1, (0, type_graphql_1.Arg)("longName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "CreateVendor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Vendor_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __param(1, (0, type_graphql_1.Arg)("shortName")),
    __param(2, (0, type_graphql_1.Arg)("longName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "UpdateVendor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Vendor_1.default),
    __param(0, (0, type_graphql_1.Arg)("VendorID", () => ObjectId_1.ObjectIdScalar)),
    __param(1, (0, type_graphql_1.Arg)("ApplicationID", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VendorResolver.prototype, "AddApplikationToVendor", null);
VendorResolver = __decorate([
    (0, type_graphql_1.Resolver)(Vendor_1.default)
], VendorResolver);
exports.default = VendorResolver;
//# sourceMappingURL=vendorResolver.js.map