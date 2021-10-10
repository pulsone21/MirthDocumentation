

export const CreateClassNamesAsString = (classNames:string[]): string => {
    let outString = "";
    classNames.forEach(el => {
        outString += el+" ";
    })
    return outString.trim();
}

