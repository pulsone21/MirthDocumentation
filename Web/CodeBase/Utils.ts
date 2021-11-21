import { BACKEND_BASE_URL } from "config";
import { dropDownElement } from "Types/dropDownElement";
import { DataArea, DataTopic, DataType, ErrorMessage, ConnectionType, Application, GetApplicationByLongNameQuery } from "../GraphQl/generated/graphgql";

export const CreateClassNamesAsString = (classNames: string[]): string => {
    let outString = "";
    classNames.forEach((el) => {
        outString += el + " ";
    });
    return outString.trim();
};

export const ObjectToErrorMap = (errors: ErrorMessage[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });
    return errorMap;
};

export const GenerateDopDownFromQuery = (response: ConnectionType[] | DataArea[] | DataType[] | DataTopic[]): dropDownElement[] => {
    let newDropDownArray: dropDownElement[] = [];
    response.forEach((el) => {
        let newDropDownElement: dropDownElement = {
            value: el._id,
            label: el.longName,
            shortName: el.shortName,
        };
        newDropDownArray.push(newDropDownElement);
    });
    return newDropDownArray;
};

export const GetCorrectedLogoUrl = (input: string): string => {
    if (input.charAt(0) == ".") input = input.substring(1);
    return BACKEND_BASE_URL + input;
};
