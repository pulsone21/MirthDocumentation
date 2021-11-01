import ComponentContainer from 'Components/MainComponents/Forms/ChannelNameComponentForms/ComponentContainer';
import copyToClipboard from 'copy-to-clipboard';
import Head from 'next/head';
import React, { useState } from 'react';
import HeaderSection from '../Components/HeaderSection';
import { dropDownElement } from '../Types/dropDownElement';
import Select from 'react-select';
import { customStyles } from 'Components/MainComponents/Forms/ChannelNameComponentForms/styleConfig';
import { useGetAllApplikationsQuery, useGetAllDataAreasQuery, useGetAllDataTopicsQuery, useGetAllDataTypesQuery, useGetAllVendorsQuery } from 'GraphQl/generated/graphgql';


interface ChannelNameBuilderProps {

}

const ChannelNameBuilder: React.FC<ChannelNameBuilderProps> = () => {
    const [channelName, SetChannelName] = useState("PlaceHolder ChannelName")
    const [copieEvent, setCopieEvent] = useState(false)
    const [copieMessage, setCopieMessage] = useState("Click the Name to copy the the Channelname")
    const [copieMessageClasses, setCopieMessageClasses] = useState("copieMessage")


    //TODO Build in the Fetch Data for the dropdowns
    const [dataTypeResponse] = useGetAllDataTypesQuery();
    const [appResponse] = useGetAllApplikationsQuery();
    const [dataAreaResponse] = useGetAllDataAreasQuery();
    const [dataTopicResponse] = useGetAllDataTopicsQuery();
    const [vendorResponse] = useGetAllVendorsQuery();


    const handleClick = () => {
        copyToClipboard(channelName);
        setCopieEvent(true)
        setCopieMessage("Channelname copied to clipboard")
        setCopieMessageClasses(prevState => `${prevState} copied`)
    }

    const environments: dropDownElement[] = [{ label: "PRD", value: "prd", shortName: "PR" }, { label: "TST", value: "tst", shortName: "TS" }, { label: "POC", value: "poc", shortName: "PO" }]

    const test = [{ value: 'prd', label: 'PRD' },
    { value: 'tst', label: 'TST' },
    { value: 'poc', label: 'POC' }]




    // const loadApps = (

    // )
    //! Reset CopieMessage on SetChannelName

    return (
        <div >
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ marginLeft: "10px", marginBottom: "0px" }} className="HeaderText">Channelname Builder</h2>
                <p style={{ marginLeft: "40px", alignSelf: "end" }} className="articalText">Here you can build out the Channelname</p>
            </div>
            <div className="channelNameBuilder-Container">
                <div className="Toolbar">
                    <h2 style={{ marginLeft: "5px" }}>Missing an Component?</h2>
                    <ComponentContainer componentName="Application" />
                    <ComponentContainer componentName="Vendor" />
                    <ComponentContainer componentName="DataType" />
                    <ComponentContainer componentName="DataArea" />
                    <ComponentContainer componentName="DataTopic" />
                </div>
                <div className="BuildingArea">
                    <h2 style={{ marginBottom: "45px" }}>Select the different components to generate a channelname</h2>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center" }}>
                        <Select styles={customStyles} placeholder="Seach for an Application" options={test} />
                        <Select styles={customStyles} placeholder="Seach for an Vendor" options={test} />
                        <Select styles={customStyles} placeholder="Seach for an DataType" options={test} />
                        <Select styles={customStyles} placeholder="Seach for an DataArea" options={test} />
                        <Select styles={customStyles} placeholder="Seach for an DataTopic" options={test} />
                        <Select styles={customStyles} placeholder="Seach for an ConnectorType" options={test} />
                        <Select styles={customStyles} placeholder="Seach for an Environment" options={environments} />
                        <Select styles={customStyles} placeholder="Seach for an Number" options={test} />
                    </div>
                </div>
                <div className="ChannelNameDisplay">
                    <h1 onClick={() => handleClick()} onAnimationEnd={() => setCopieEvent(false)} className={copieEvent ? 'clickToCopyEvent ChannelNameOutput' : 'ChannelNameOutput'}>{channelName}</h1>
                    <p className={copieMessageClasses}>{copieMessage}</p>
                </div>
            </div>
        </div >
    );
}
