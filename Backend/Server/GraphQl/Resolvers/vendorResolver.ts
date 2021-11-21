import { ObjectId } from "mongoose";
import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import Vendor, { VendorModel, VendorResponse } from "../../Classes/Vendor";
import { ApplicationModel } from "../../Classes/Application";

//TODO Build a Way to also get the application from the vendor side
@Resolver(Vendor)
export default class VendorResolver {
    @Query(() => [Vendor])
    async GetAllVendors(): Promise<Vendor[]> {
        return await VendorModel.find({});
    }

    @Query(() => VendorResponse)
    async GetVendorByID(@Arg("id") id: String): Promise<VendorResponse> {
        let Vendor = await VendorModel.findOne({ id });
        if (!Vendor) return { Errors: [{ field: "id", message: "No Vendor with id: " + id + " found!" }] };
        return { Vendor };
    }

    @Query(() => VendorResponse)
    async GetVendorShortName(@Arg("shortName") shortName: String): Promise<VendorResponse> {
        let Vendor = await VendorModel.find({ shortName });
        if (!Vendor) return { Errors: [{ field: "shortName", message: "no Vendor found with shortname: " + shortName }] };
        if (Vendor.length > 1) return { Errors: [{ field: "shortName", message: "more then one Vendor found with shortname: " + shortName }] };
        return { Vendor: Vendor[0] };
    }

    @Query(() => VendorResponse)
    async GetVendorByLongName(@Arg("longName") longName: String): Promise<VendorResponse> {
        let Vendor = await VendorModel.find({ longName });
        if (!Vendor) return { Errors: [{ field: "longName", message: "no Vendor found with longName: " + longName }] };
        if (Vendor.length > 1) return { Errors: [{ field: "longName", message: "more then one Vendor found with longName: " + longName }] };
        return { Vendor: Vendor[0] };
    }

    @Mutation(() => VendorResponse)
    async CreateVendor(
        @Arg("shortName") shortName: String,
        @Arg("longName") longName: String,
        @Arg("appLongname", { nullable: true }) applongName: String
    ): Promise<VendorResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) return validation;
        if (!longName) return { Errors: [{ field: "longName", message: "please enter a Longname" }] };
        const vendor = await VendorModel.create({ shortName, longName });
        if (applongName) {
            const app = await ApplicationModel.find({ applongName });
            if (app.length === 1) {
                if (!app[0].vendor) {
                    app[0].vendor = vendor;
                    app[0].save();
                }
            } else if (app.length > 1) {
                return { Errors: [{ field: "application", message: `more then one application found` }] };
            } else {
                return { Errors: [{ field: "application", message: `no application with ${applongName} found` }] };
            }
        }
        return { Vendor: vendor };
    }

    @Mutation(() => VendorResponse)
    async UpdateVendor(
        @Arg("id", () => ObjectIdScalar) id: ObjectId,
        @Arg("shortName") shortName: String,
        @Arg("longName") longName: String
    ): Promise<VendorResponse> {
        const validation = await BaseValidation(shortName);
        if (validation) return validation;
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
            return { Vendor: vend };
        }
        return { Errors: [{ field: "id", message: "Something went wrong!" }] };
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
