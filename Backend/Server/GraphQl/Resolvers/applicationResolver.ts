import { ObjectId } from "mongoose";
require("dotenv").config();
import Application, { ApplicationModel, ApplicationResponse, BaseApplication } from "../../Classes/Application";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../myScalars/ObjectId";
import { VendorModel } from "../../Classes/Vendor";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../Types/UploadType";
import { createWriteStream } from "fs";
import shortid from "shortid";
import DeletionMessage from "../../Types/DeletionMessage";

@Resolver(Application)
export default class ApplicationResolver {
    @Query(() => [BaseApplication])
    async GetAllApplikations(): Promise<BaseApplication[]> {
        return await ApplicationModel.find({});
    }

    @Query(() => ApplicationResponse)
    async GetApplicationByShortName(@Arg("shortName") shortName: String): Promise<ApplicationResponse> {
        const Application = await ApplicationModel.findOne({ shortName });
        if (!Application) {
            return {
                Errors: [
                    {
                        field: "shortName",
                        message: `No application found with Shortname: ${shortName}`,
                    },
                ],
            };
        } else {
            return {
                Application,
            };
        }
    }

    @Query(() => ApplicationResponse)
    async GetApplicationByLongName(@Arg("longName") longName: String): Promise<ApplicationResponse> {
        const Application = await ApplicationModel.findOne({ longName });
        if (!Application) {
            return {
                Errors: [
                    {
                        field: "longName",
                        message: `No application found with Longname: ${longName}`,
                    },
                ],
            };
        } else {
            return {
                Application,
            };
        }
    }

    @Query(() => ApplicationResponse)
    async GetApplicationByID(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<ApplicationResponse> {
        const Application = await ApplicationModel.findOne({ id });
        if (!Application) {
            return {
                Errors: [
                    {
                        field: "ID",
                        message: `No application found with ID: ${id}`,
                    },
                ],
            };
        } else {
            return {
                Application,
            };
        }
    }

    @Mutation(() => Boolean)
    async addAppLogo(@Arg("logo", () => GraphQLUpload) logo: Upload): Promise<boolean> {
        let res = await SaveLogoToServer(logo);
        return res.response;
    }

    @Mutation(() => ApplicationResponse)
    async CreateApplication(
        @Arg("shortName") shortName: String,
        @Arg("longName") longName: String,
        @Arg("logo", () => GraphQLUpload, { nullable: true }) logo: Upload,
        @Arg("VendorLongname", { nullable: true }) vendLongName: String
    ): Promise<ApplicationResponse> {
        let logoUrl = "";
        if (logo) {
            let { response, url } = await SaveLogoToServer(logo);
            if (!response) {
                return {
                    Errors: [
                        {
                            field: "Logo",
                            message: "Something went wrong during the image saving, nothing was saved!",
                        },
                    ],
                };
            }
            logoUrl = url;
        }

        let vendor;
        if (vendLongName) {
            vendor = await VendorModel.findOne({ longName: vendLongName });
        }

        const validation = await BaseValidation(shortName);
        if (validation) {
            return validation;
        }

        if (!longName) {
            return {
                Errors: [{ field: "longName", message: "please enter a Longname" }],
            };
        }

        if (vendor) {
            const app = await ApplicationModel.create({ shortName, longName, logoUrl, vendor });
            vendor?.applications.push(app);
            return {
                Application: app,
            };
        } else {
            const app = await ApplicationModel.create({ shortName, longName, logoUrl });
            return {
                Errors: [
                    {
                        field: "VendorLongName",
                        message: `Vendor with ID ${vendLongName} couldnt be found.`,
                    },
                ],
                Application: app,
            };
        }
    }

    @Mutation(() => DeletionMessage)
    async DeleteApplication(@Arg("id", () => ObjectIdScalar) id: ObjectId): Promise<DeletionMessage> {
        const App = await ApplicationModel.findOne({ id });

        if (!App) {
            return {
                Errors: [{ field: "id", message: "No App with this id found" }],
            };
        }
        let logoDeletion = await Application.DeleteMyLogo(App.logoUrl.toString());
        if (!logoDeletion) {
            return {
                Errors: [{ field: "id", message: "could not delete logo, please remove the logo manually from: " + App.logoUrl }],
            };
        }
        let res = await ApplicationModel.deleteOne({ id });

        if (res.deletedCount > 0) return { deletion: true };
        return { deletion: false, Errors: [{ field: "id", message: "something went wrong, could not delete the document" }] };
    }

    @Mutation(() => ApplicationResponse)
    async UpdateApplication(
        @Arg("id", () => ObjectIdScalar) id: ObjectId,
        @Arg("shortName", { nullable: true }) shortName: String,
        @Arg("longName", { nullable: true }) longName: String,
        @Arg("logo", () => GraphQLUpload, { nullable: true }) logo: Upload,
        @Arg("VendorLongname", { nullable: true }) vendLongName: String
    ): Promise<ApplicationResponse> {
        if (shortName == undefined && vendLongName == undefined && longName == undefined && logo == undefined) {
            return {
                Errors: [{ field: "id", message: "Please add atleast one field to update" }],
            };
        }
        const validation = await BaseValidation(shortName);
        if (validation) {
            return validation;
        }
        const Application = await ApplicationModel.findById(id);
        if (Application) {
            if (shortName != undefined) {
                Application.shortName = shortName;
                Application.save();
            }

            if (longName != undefined) {
                Application.longName = longName;
                Application.save();
            }

            if (logo != undefined) {
                let res = await SaveLogoToServer(logo);
                Application.logoUrl = res.url;
                Application.save();
            }

            if (vendLongName != undefined) {
                const vend = await VendorModel.findOne({ longName: vendLongName });
                if (!vend) {
                    return {
                        Errors: [{ field: "VendorLongName", message: `Vendor with ${vendLongName} could not be found!` }],
                    };
                } else {
                    Application.vendor = vend;
                    Application.save();
                }
            }
            return {
                Application,
            };
        } else {
            return {
                Errors: [{ field: "id", message: `Application with ${id} could not be found!` }],
            };
        }
    }

    @Mutation(() => ApplicationResponse)
    async AddVendorToApplication(
        @Arg("VendorID", () => ObjectIdScalar, { nullable: false }) vendId: ObjectId,
        @Arg("ApplicationID", () => ObjectIdScalar, { nullable: false }) appId: ObjectId
    ): Promise<ApplicationResponse> {
        const vend = await VendorModel.findById(vendId);
        const app = await ApplicationModel.findById(appId);
        if (!app) return { Errors: [{ field: "ApplicationID", message: `App with ${appId} not found!` }] };
        if (!vend) return { Errors: [{ field: "VendorID", message: `Vendor with ${vendId} not found!` }] };

        app.vendor = vend;
        app.save();
        if (vend.applications.some((e) => e?._id.toString() === vendId.toString())) {
            //Do nothing since the app is already in the array
        } else {
            vend.applications.push(app);
            vend.save();
        }
        return {
            Application: app,
        };
    }
}

async function BaseValidation(shortName: String): Promise<ApplicationResponse | undefined> {
    const validation = Application.CheckShortName(shortName);
    if (validation) {
        return validation;
    }
    const exist = ApplicationModel.CheckShortnameAvailable(shortName);
    if (exist) {
        return exist;
    }
    return;
}

type SaveToServer = {
    response: any;
    url: string;
};

async function SaveLogoToServer(logo: Upload): Promise<SaveToServer> {
    let id = shortid.generate();
    let url = `${process.env.IMAGE_DIR}/${id}`;
    let response = await new Promise(async (resolve) => {
        logo.createReadStream()
            .pipe(createWriteStream(url))
            .on("finish", () => resolve(true))
            .on("error", () => resolve(false));
    });

    return {
        response,
        url,
    };
}
