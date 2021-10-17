import BaseChannelComponentForm from 'Components/MainComponents/Forms/ChannelNameComponentForms/BaseChannelComponentForm';
import VendorForm from 'Components/MainComponents/Forms/ChannelNameComponentForms/VendorForm';
import Head from 'next/head';
import React from 'react';
import HeaderSection from '../Components/HeaderSection';

interface ChannelNameBuilderProps {

}

const ChannelNameBuilder: React.FC<ChannelNameBuilderProps> = () => {
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
                    <div className="container">
                        <BaseChannelComponentForm componentName="Application" />
                    </div>
                    <div className="container">
                        <VendorForm />
                    </div>
                    <div className="container">
                        <BaseChannelComponentForm componentName="DataType" />
                    </div>
                    <div className="container">
                        <BaseChannelComponentForm componentName="DataArea" />
                    </div>
                    <div className="container">
                        <BaseChannelComponentForm componentName="DataTopic" />
                    </div>
                </div>
                <div className="BuildingArea">


                </div>
                <div className="ChannelNameDisplay">

                </div>
            </div>
        </div >
    );
}

export default ChannelNameBuilder;