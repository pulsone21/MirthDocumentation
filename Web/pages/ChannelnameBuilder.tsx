import ComponentContainer from 'Components/MainComponents/Forms/ChannelNameComponentForms/ComponentContainer';
import copyToClipboard from 'copy-to-clipboard';
import Head from 'next/head';
import React, { useState } from 'react';
import HeaderSection from '../Components/HeaderSection';
import { dropDownElement } from '../Types/dropDownElement';
import Select from 'react-select';
import { customStyles } from 'Components/MainComponents/Forms/ChannelNameComponentForms/styleConfig';
import { useChannelnameExistMutation, useGetAllApplikationsQuery, useGetAllDataAreasQuery, useGetAllDataTopicsQuery, useGetAllDataTypesQuery, useGetAllVendorsQuery } from 'GraphQl/generated/graphgql';
import { GenerateDopDownFromQuery } from 'CodeBase/Utils';
import { ConnectorNameAcessor, ConnectorNameHelper, GenerateNameFromHelper, initConnectorName } from 'Types/ConnectorTypeHelper';

interface ChannelNameBuilderProps {

}

const ChannelNameBuilder: React.FC<ChannelNameBuilderProps> = () => {
    const [channelName, SetChannelName] = useState("PlaceHolder ChannelName")
    const [copieEvent, setCopieEvent] = useState(false)
    const [copieMessage, setCopieMessage] = useState("Click the Name to copy the the Channelname")
    const [copieMessageClasses, setCopieMessageClasses] = useState("copieMessage")
    const [connectorNameHelper, _] = useState<ConnectorNameHelper>(initConnectorName);
    const [, channelNameExist] = useChannelnameExistMutation();

    const [{ data: dataTypeRawData, fetching: dataTypeFetch }] = useGetAllDataTypesQuery();
    let dataTypeData: dropDownElement[] = []
    if (!dataTypeFetch) {
        if (dataTypeRawData?.GetAllDataTypes) dataTypeData = GenerateDopDownFromQuery(dataTypeRawData.GetAllDataTypes)
    }

    const [{ data: appRawData, fetching: appFetch }] = useGetAllApplikationsQuery();
    let appData: dropDownElement[] = []
    if (!appFetch) {
        if (appRawData?.GetAllApplikations) appData = GenerateDopDownFromQuery(appRawData.GetAllApplikations)
    }

    const [{ data: dataAreaRawData, fetching: dataAreaFetch }] = useGetAllDataAreasQuery();
    let dataAreaData: dropDownElement[] = []
    if (!dataAreaFetch) {
        if (dataAreaRawData?.GetAllDataAreas) dataAreaData = GenerateDopDownFromQuery(dataAreaRawData.GetAllDataAreas)
    }

    const [{ data: dataTopicRawData, fetching: dataTopicFetch }] = useGetAllDataTopicsQuery();
    let dataTopicData: dropDownElement[] = []
    if (!dataTopicFetch) {
        if (dataTopicRawData?.GetAllDataTopics) dataTopicData = GenerateDopDownFromQuery(dataTopicRawData.GetAllDataTopics)
    }

    const [{ data: vendRawData, fetching: vendFetch }] = useGetAllVendorsQuery();
    let vendData: dropDownElement[] = []
    if (!vendFetch) {
        if (vendRawData?.GetAllVendors) vendData = GenerateDopDownFromQuery(vendRawData.GetAllVendors)
    }


    const handleClick = () => {
        copyToClipboard(channelName);
        setCopieEvent(true)
        setCopieMessage("Channelname copied to clipboard")
        setCopieMessageClasses(prevState => `${prevState} copied`)
    }

    const handleSubmit = async () => {
        connectorNameHelper.name = GenerateNameFromHelper(connectorNameHelper);
        let response;
        if (connectorNameHelper.name) {
            response = await channelNameExist({ name: connectorNameHelper.name })
            if (response?.data?.ChannelnameExist === true) {
                setCopieMessage("CHANNELNAME ALREADY EXIST!")
                setCopieMessageClasses(prevState => `${prevState} error`)
                return;
            }
            SetChannelName(connectorNameHelper.name)
            //? we dont want to create the Channel, since it could be that the channel is not created. Saving Numbers and Storage
        }
    }

    const onSelectChange = (newValue: any, nameAccessor: ConnectorNameAcessor) => {
        let newDropDownElement: dropDownElement = newValue
        let acces = nameAccessor.componentName
        connectorNameHelper[acces] = newDropDownElement
    }

    const environments: dropDownElement[] = [{ label: "PRD", value: "prd", shortName: "PR" }, { label: "TST", value: "tst", shortName: "TS" }, { label: "POC", value: "poc", shortName: "PO" }]

    return (
        <div >
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
                <h2 style={{ marginLeft: "10px", marginBottom: "0px" }} className="HeaderText">Channelname Builder</h2>
                <p style={{ marginLeft: "40px", alignSelf: "end" }} className="articalText">Here you can build out the Channelname</p>
            </div>
            <div className="channelNameBuilder-Container">
                <div className="Toolbar">
                    <h2 style={{ marginLeft: "5px", fontWeight: "bold", fontSize: "1.5em" }}>Missing an Component?</h2>
                    <ComponentContainer vendorList={vendData} componentName="Application" />
                    <ComponentContainer componentName="Vendor" />
                    <ComponentContainer componentName="DataType" />
                    <ComponentContainer componentName="DataArea" />
                    <ComponentContainer componentName="DataTopic" />
                </div>
                <div className="BuildingArea">
                    <h2 style={{ marginBottom: "45px" }}>Select the different components to generate a channelname</h2>
                    <div className="flex justify-center">
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "application" })} placeholder="Seach for an Application" options={appData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "vendor" })} placeholder="Seach for an Vendor" options={vendData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "dataType" })} placeholder="Seach for an DataType" options={dataTypeData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "dataArea" })} placeholder="Seach for an DataArea" options={dataAreaData} />
                    </div>
                    <div className="flex mt-5 mb-5">
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "dataTopic" })} placeholder="Seach for an DataTopic" options={dataTopicData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "connectionType" })} placeholder="Seach for an ConnectorType" options={environments} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "environment" })} placeholder="Seach for an Environment" options={environments} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "channelNumber" })} placeholder="Seach for an Number" options={environments} />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="baseBtn p-2"><p>Generate Channel Name</p></button>
                </div>
                <div className="ChannelNameDisplay">
                    <h1 onClick={() => handleClick()} onAnimationEnd={() => setCopieEvent(false)} className={copieEvent ? 'clickToCopyEvent ChannelNameOutput' : 'ChannelNameOutput'}>{channelName}</h1>
                    <p className={copieMessageClasses}>{copieMessage}</p>
                </div>
            </div>
        </div >
    );
}


export default ChannelNameBuilder;