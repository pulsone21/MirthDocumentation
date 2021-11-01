import { dropDownElement } from "./dropDownElement";

export type ConnectorNameHelper = {
    application: dropDownElement | undefined;
    channelNumber: dropDownElement | undefined;
    connectionType: dropDownElement | undefined;
    dataArea: dropDownElement | undefined;
    dataTopic: dropDownElement | undefined;
    dataType: dropDownElement | undefined;
    environment: dropDownElement | undefined;
    name: string | undefined;
    vendor: dropDownElement | undefined;
    version: dropDownElement | undefined;
};

export function GenerateNameFromHelper(i: ConnectorNameHelper) {
    return `${i.application?.shortName}${i.vendor?.shortName}_${i.dataArea?.shortName}${i.dataTopic?.shortName}_${i.environment?.shortName}_${i.dataType?.shortName}_${i.channelNumber}_${i.version}_${i.connectionType?.shortName}`;
}

export interface ConnectorNameAcessor {
    componentName: "application" | "channelNumber" | "connectionType" | "dataArea" | "dataTopic" | "dataType" | "environment" | "vendor" | "version";
}

export const initConnectorName: ConnectorNameHelper = {
    application: undefined,
    channelNumber: undefined,
    connectionType: undefined,
    dataArea: undefined,
    dataTopic: undefined,
    dataType: undefined,
    environment: undefined,
    name: undefined,
    vendor: undefined,
    version: undefined,
};
