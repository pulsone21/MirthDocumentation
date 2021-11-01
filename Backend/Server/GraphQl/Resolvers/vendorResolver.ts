import { ObjectId } from "mongoose";
import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import Vendor, { VendorModel, VendorResponse, BaseVendor } from "../../Classes/Vendor";
import { ApplicationModel } from "../../Classes/Application";

@Resolver(Vendor)
export default class VendorResolver {
    @Query(() => [BaseVendor])
    async GetAllVendors(): Promise<BaseVendor[]> {
        return await VendorModel.find({});
    }

    @Query(() => Vendor)
    async GetVendorByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
        try {
            return await VendorModel.findById(id);
        } catch (err) {
            throw new Error("No Vendor found with ID: " + id);
        }
    }

    @Query(() => Vendor)
    async GetVendorShortName(@Arg("shortName") ShortName: String) {
        try {
            return await VendorModel.findOne({ shortName: ShortName });
        } catch (err) {
            throw new Error("No Vendor found in the DB!");
        }
    }

    @Query(() => Vendor)
    async GetVendorByLongName(@Arg("longName") LongName: String) {
        try {
            return await VendorModel.findOne({ longName: LongName });
        } catch (err) {
            throw new Error("No Vendor found in the DB!");
        }
    }

    @Mutation(() => VendorResponse)
    async CreateVendor(
        @Arg("shortName") shortName: String,
        @Arg("longName") longName: String,
        @Arg("appLongname", { nullable: true }) applongName: String
    ): Promise<VendorResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) {
            return validation;
        }
        if (!longName) {
            return {
                Errors: [{ field: "longName", message: "please enter a Longname" }],
            };
        }

        const vendor = await VendorModel.create({ shortName, longName });
        if (applongName) {
            const app = await ApplicationModel.find({ applongName });
            if (app.length === 1) {
                vendor.applications.push(app[0]);
                vendor.save();
            } else if (app.length > 1) {
                return {
                    Errors: [
                        {
                            field: "application",
                            message: `more then one application found`,
                        },
                    ],
                };
            } else {
                return {
                    Errors: [
                        {
                            field: "application",
                            message: `no application with ${applongName} found`,
                        },
                    ],
                };
            }
        }
        return {
            Vendor: vendor,
        };
    }

    @Mutation(() => Vendor)
    async UpdateVendor(
        @Arg("id", () => ObjectIdScalar) id: ObjectId,
        @Arg("shortName") shortName: String,
        @Arg("longName") longName: String
    ): Promise<VendorResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) {
            return validation;
        }

        const vend = await VendorModel.findById(id);
        if (vend) {
            if (shortName != undefined) {
                vend.shortName = shortName;
                vend.save();
            }

            if (longName != undefined) {
                vend.longName = longName;
                vend.save();
            }
            return {
                Vendor: vend,
            };
        }
        return {
            Errors: [{ field: "id", message: "Something went wrong!" }],
        };
    }

    @Mutation(() => Vendor)
    async AddApplikationToVendor(@Arg("VendorID", () => ObjectIdScalar) vendId: ObjectId, @Arg("ApplicationID", () => ObjectIdScalar) appId: ObjectId) {
        const vend = await VendorModel.findById(vendId);
        const app = await ApplicationModel.findById(appId);
        if (vend && app) {
            if (vend.applications.some((e) => e?._id.toString() === vendId.toString())) {
                //Do nothing since the app is already in the array
                throw new Error(`Application with ID: ${appId} allready in the List from Vendor with ID: ${vendId}`);
            } else {
                vend.applications.push(app);
                vend.save();
                return vend;
            }
        } else {
            return null;
        }
    }
}

async function BaseValidation(shortName: String): Promise<VendorResponse | undefined> {
    const validation = Vendor.CheckShortName(shortName);
    if (validation) {
        return validation;
    }
    const exist = Vendor.CheckShortnameAvailable(shortName);
    if (exist) {
        return exist;
    }
    return;
}
