import ComponentContainer from 'Components/MainComponents/Forms/ChannelNameComponentForms/ComponentContainer';
import copyToClipboard from 'copy-to-clipboard';
import Head from 'next/head';
import React, { useState } from 'react';
import HeaderSection from '../Components/HeaderSection';
import { dropDownElement } from '../Types/dropDownElement';
import Select from 'react-select';
import { customStyles } from '../Components/BasicComponents/Forms/styleConfig';
import { useChannelnameExistMutation, useGetAllApplikationsBasicQuery, useGetAllConnectionTypesQuery, useGetAllDataAreasQuery, useGetAllDataTopicsQuery, useGetAllDataTypesQuery, useGetAllVendorsQuery } from 'GraphQl/generated/graphgql';
import { GenerateDopDownFromQuery } from 'CodeBase/Utils';
import { ConnectorNameAcessor, ConnectorNameHelper, GenerateNameFromHelper, initConnectorName } from 'Types/ConnectorTypeHelper';
import styles from "../styles/Module/Pages/channelNameBuilder.module.css"
import btnStyles from "../styles/Module/Components/basicComponents/button.module.css"
import copyMsgStyle from "../styles/Module/Components/basicComponents/jsonDisplay.module.css"
//TODO Implement the Numbering Convention ---> maybe complete automatic with possible settings in a config file.....
interface ChannelNameBuilderProps {

}

const ChannelNameBuilder: React.FC<ChannelNameBuilderProps> = () => {
    const [channelName, SetChannelName] = useState("PlaceHolder ChannelName")
    const [copieEvent, setCopieEvent] = useState(false)
    const [copieMessage, setCopieMessage] = useState("Click the Name to copy the the Channelname")
    const [copieMessageClasses, setCopieMessageClasses] = useState(copyMsgStyle.copieMessage)
    const [connectorNameHelper, _] = useState<ConnectorNameHelper>(initConnectorName);
    const [, channelNameExist] = useChannelnameExistMutation();

    const [{ data: dataTypeRawData, fetching: dataTypeFetch }] = useGetAllDataTypesQuery();
    let dataTypeData: dropDownElement[] = []
    if (!dataTypeFetch) {
        if (dataTypeRawData?.GetAllDataTypes) dataTypeData = GenerateDopDownFromQuery(dataTypeRawData.GetAllDataTypes)
    }

    const [{ data: appRawData, fetching: appFetch }] = useGetAllApplikationsBasicQuery();
    let appData: dropDownElement[] = []
    if (!appFetch) {
        //@ts-ignore gument of type '{ __typename?: "Application" | undefined; _id: any; longName: string; shortName: string; }[]' is not assignable to parameter of type. 
        //Vendor is missing in the get Json therefor the Object looks not exactly like an Application[]
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

    const [{ data: conTypRawData, fetching: conTypFetch }] = useGetAllConnectionTypesQuery();
    let conTypData: dropDownElement[] = []
    if (!conTypFetch) {
        if (conTypRawData?.GetAllConnectionTypes) conTypData = GenerateDopDownFromQuery(conTypRawData.GetAllConnectionTypes)
    }


    const handleClick = () => {
        copyToClipboard(channelName);
        setCopieEvent(true)
        setCopieMessage("Channelname copied to clipboard")
        setCopieMessageClasses(prevState => `${prevState} ${copyMsgStyle.copied}`)
    }

    const handleSubmit = async () => {
        connectorNameHelper.name = GenerateNameFromHelper(connectorNameHelper);
        console.log(connectorNameHelper.name)
        let response;
        if (connectorNameHelper.name) {
            response = await channelNameExist({ name: connectorNameHelper.name })
            console.log(response)
            if (response?.data?.ChannelnameExist === true) {
                setCopieMessage("CHANNELNAME ALREADY EXIST!")
                setCopieMessageClasses(prevState => `${prevState} ${styles.error}`)
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
            <div className={styles["channelNameBuilder-Container"]}>
                <div className={styles.Toolbar}>
                    <div style={{ marginTop: "15px" }}>
                        <h1 style={{ marginLeft: "10px", marginBottom: "0px" }} className="HeaderTitle">Channelname Builder</h1>
                        <p style={{ marginLeft: "40px" }} className="ArticalText">Here you can build out the Channelname</p>
                    </div>
                    <div style={{ marginTop: "5px", }} className={styles.InnerToolbarContainer}>
                        <h2 className={styles.ToolbarHeader}>Missing an Component?</h2>
                        <ComponentContainer vendorList={vendData} componentName="Application" />
                        <ComponentContainer componentName="Vendor" />
                        <ComponentContainer componentName="DataType" />
                        <ComponentContainer componentName="DataArea" />
                        <ComponentContainer componentName="DataTopic" />
                    </div>
                </div>
                <div className={styles.BuildingArea}>
                    <h2 style={{ marginBottom: "45px" }}>Select the different components to generate a channelname</h2>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "application" })} placeholder="Seach for an Application" options={appData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "vendor" })} placeholder="Seach for an Vendor" options={vendData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "dataType" })} placeholder="Seach for an DataType" options={dataTypeData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "dataArea" })} placeholder="Seach for an DataArea" options={dataAreaData} />
                    </div>
                    <div style={{ display: "flex", marginBottom: "5px", marginTop: "5px" }}>
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "dataTopic" })} placeholder="Seach for an DataTopic" options={dataTopicData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "connectionType" })} placeholder="Seach for an ConnectorType" options={conTypData} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "environment" })} placeholder="Seach for an Environment" options={environments} />
                        <Select styles={customStyles} onChange={(newValue) => onSelectChange(newValue, { componentName: "channelNumber" })} placeholder="Seach for an Number" options={environments} />
                    </div>
                    <button type="submit" onClick={handleSubmit} style={{ padding: "0.5rem" }} className={btnStyles.baseBtn}><p>Generate Channel Name</p></button>
                </div>
                <div className={styles.ChannelNameDisplay}>
                    <h1 onClick={() => handleClick()} onAnimationEnd={() => setCopieEvent(false)} className={copieEvent ? 'clickToCopyEvent ' + styles.ChannelNameOutput : styles.ChannelNameOutput}>{channelName}</h1>
                    <p className={copieMessageClasses}>{copieMessage}</p>
                </div>
            </div>
        </div >
    );
}


export default ChannelNameBuilder;