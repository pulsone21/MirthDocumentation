import { ApplicationResponse } from "./Application";
import { DataAreaResponse } from "./DataArea";
import { DataTopicResponse } from "./DataTopic";
import { DataTypeResponse } from "./DataType";
import { VendorResponse } from "./Vendor";

export class BaseNameComponent {
    public static CheckShortName(
        shortName: String
    ): VendorResponse | DataAreaResponse | DataTypeResponse | DataTopicResponse | ApplicationResponse | undefined {
        if (shortName.length == 3) {
            return;
        }
        return {
            Errors: [{ field: "shortName", message: `Shortname needs to be 3 letters` }],
        };
    }

    public static async CheckShortnameAvailable(
        shortName: String
    ): Promise<VendorResponse | DataAreaResponse | DataTypeResponse | DataTopicResponse | ApplicationResponse | undefined> {
        console.log(shortName);
        throw new Error("Function not Implemented");
    }
}
