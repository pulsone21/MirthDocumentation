import Head from 'next/head';
import React from 'react';
import HeaderSection from '../Components/HeaderSection';

interface ChannelNameBuilderProps {

}

const ChannelNameBuilder: React.FC<ChannelNameBuilderProps> = () => {
    return (<div><Head>
        <title>Mirth Documentation 2.0</title>
        <link rel="shortcut icon" href="/MDlogoSimplified.png" />
    </Head><HeaderSection></HeaderSection></div>);
}

export default ChannelNameBuilder;