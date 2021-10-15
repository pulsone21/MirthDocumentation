import { ErrorMessage } from "../GraphQl/generated/graphgql";

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
