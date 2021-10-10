import { ObjectId } from "mongoose";
import Application, { ApplicationModel } from "../../Classes/Application";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { VendorModel } from "../../Classes/Vendor";

@Resolver(Application)
export default class ApplicationResolver {
  @Query(() => [Application])
  async GetAllApplikations() {
    try {
      return await ApplicationModel.find({});
    } catch (err) {
      throw new Error("No Applications found in the DB!");
    }
  }

  @Query(() => Application)
  async GetApplicationByShortName(@Arg("shortName") ShortName: String) {
    try {
      return await ApplicationModel.findOne({ shortName: ShortName });
    } catch (err) {
      throw new Error("No Application found in the DB!");
    }
  }

  @Query(() => Application)
  async GetApplicationByLongName(@Arg("longName") LongName: String) {
    try {
      return await ApplicationModel.findOne({ longName: LongName });
    } catch (err) {
      throw new Error("No Application found in the DB!");
    }
  }

  @Query(() => Application)
  async GetApplicationByID(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
    try {
      return await ApplicationModel.findById(id);
    } catch (err) {
      throw new Error("No Applications found in the DB!");
    }
  }

  @Mutation(() => Application)
  async CreateApplication(@Arg("shortName") shortName: String, @Arg("longName") longName: String, @Arg("VendorID", () => ObjectIdScalar) vendorId: ObjectId) {
    try {
      const vendor = await VendorModel.findById(vendorId);
      if (vendor) {
        const app = await ApplicationModel.create({ shortName, longName, vendor });
        vendor?.applications.push(app);
        return app;
      } else {
        const app = await ApplicationModel.create({ shortName, longName });
        return `Application with ${app.id} created, but Vendor with ID ${vendorId} couldnt be found.`;
      }
    } catch (err) {
      throw new Error("Application could not be created");
    }
  }

  @Mutation(() => Application)
  async UpdateApplication(
    @Arg("id", () => ObjectIdScalar) id: ObjectId,
    @Arg("shortName") shortName: String,
    @Arg("longName") longName: String,
    @Arg("VendorID", () => ObjectIdScalar) vendId: ObjectId
  ) {
    const app = await ApplicationModel.findById(id);
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
        const vend = await VendorModel.findById(vendId);
        if (vend) {
          app.vendor = vend;
          app.save();
        } else {
          throw new Error(`Vendor with ${vendId} not found!`);
        }
      }
      return app;
    } else {
      return null;
    }
  }

  @Mutation(() => Application)
  async AddVendorToApplication(
    @Arg("VendorID", () => ObjectIdScalar, { nullable: false }) vendId: ObjectId,
    @Arg("ApplicationID", () => ObjectIdScalar, { nullable: false }) appId: ObjectId
  ) {
    const vend = await VendorModel.findById(vendId);
    const app = await ApplicationModel.findById(appId);
    if (vend && app) {
      app.vendor = vend;
      app.save();
      if (vend.applications.some((e) => e?._id.toString() === vendId.toString())) {
        //Do nothing since the app is already in the array
      } else {
        vend.applications.push(app);
        vend.save();
      }
      return app;
    } else {
      return null;
    }
  }
}
