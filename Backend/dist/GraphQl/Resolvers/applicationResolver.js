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
const Application_1 = __importStar(require("../../Classes/Application"));
const type_graphql_1 = require("type-graphql");
const ObjectId_1 = require("../myScalars/ObjectId");
const Vendor_1 = require("../../Classes/Vendor");
let ApplicationResolver = class ApplicationResolver {
    async GetAllApplikations() {
        try {
            return await Application_1.ApplicationModel.find({});
        }
        catch (err) {
            throw new Error("No Applications found in the DB!");
        }
    }
    async GetApplicationByShortName(ShortName) {
        try {
            return await Application_1.ApplicationModel.findOne({ shortName: ShortName });
        }
        catch (err) {
            throw new Error("No Application found in the DB!");
        }
    }
    async GetApplicationByLongName(LongName) {
        try {
            return await Application_1.ApplicationModel.findOne({ longName: LongName });
        }
        catch (err) {
            throw new Error("No Application found in the DB!");
        }
    }
    async GetApplicationByID(id) {
        try {
            return await Application_1.ApplicationModel.findById(id);
        }
        catch (err) {
            throw new Error("No Applications found in the DB!");
        }
    }
    async CreateApplication(shortName, longName, vendorId) {
        try {
            const vendor = await Vendor_1.VendorModel.findById(vendorId);
            if (vendor) {
                const app = await Application_1.ApplicationModel.create({ shortName, longName, vendor });
                vendor === null || vendor === void 0 ? void 0 : vendor.applications.push(app);
                return app;
            }
            else {
                const app = await Application_1.ApplicationModel.create({ shortName, longName });
                return `Application with ${app.id} created, but Vendor with ID ${vendorId} couldnt be found.`;
            }
        }
        catch (err) {
            throw new Error("Application could not be created");
        }
    }
    async UpdateApplication(id, shortName, longName, vendId) {
        const app = await Application_1.ApplicationModel.findById(id);
        if (app) {
            if (shortName != undefined) {
                app.shortName = shortName;
                app.save();
            }
            if (longName != undefined) {
                app.longName = longName;
                app.save();
            }
            if (vendId != undefined) {
                const vend = await Vendor_1.VendorModel.findById(vendId);
                if (vend) {
                    app.vendor = vend;
                    app.save();
                }
                else {
                    throw new Error(`Vendor with ${vendId} not found!`);
                }
            }
            return app;
        }
        else {
            return null;
        }
    }
    async AddVendorToApplication(vendId, appId) {
        const vend = await Vendor_1.VendorModel.findById(vendId);
        const app = await Application_1.ApplicationModel.findById(appId);
        if (vend && app) {
            app.vendor = vend;
            app.save();
            if (vend.applications.some((e) => (e === null || e === void 0 ? void 0 : e._id.toString()) === vendId.toString())) {
            }
            else {
                vend.applications.push(app);
                vend.save();
            }
            return app;
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Application_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "GetAllApplikations", null);
__decorate([
    (0, type_graphql_1.Query)(() => Application_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "GetApplicationByShortName", null);
__decorate([
    (0, type_graphql_1.Query)(() => Application_1.default),
    __param(0, (0, type_graphql_1.Arg)("longName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "GetApplicationByLongName", null);
__decorate([
    (0, type_graphql_1.Query)(() => Application_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "GetApplicationByID", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Application_1.default),
    __param(0, (0, type_graphql_1.Arg)("shortName")),
    __param(1, (0, type_graphql_1.Arg)("longName")),
    __param(2, (0, type_graphql_1.Arg)("VendorID", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "CreateApplication", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Application_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => ObjectId_1.ObjectIdScalar)),
    __param(1, (0, type_graphql_1.Arg)("shortName")),
    __param(2, (0, type_graphql_1.Arg)("longName")),
    __param(3, (0, type_graphql_1.Arg)("VendorID", () => ObjectId_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String,
        String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "UpdateApplication", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Application_1.default),
    __param(0, (0, type_graphql_1.Arg)("VendorID", () => ObjectId_1.ObjectIdScalar, { nullable: false })),
    __param(1, (0, type_graphql_1.Arg)("ApplicationID", () => ObjectId_1.ObjectIdScalar, { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationResolver.prototype, "AddVendorToApplication", null);
ApplicationResolver = __decorate([
    (0, type_graphql_1.Resolver)(Application_1.default)
], ApplicationResolver);
exports.default = ApplicationResolver;
//# sourceMappingURL=applicationResolver.js.map