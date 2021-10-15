import Head from 'next/head';
import * as React from 'react';
import HeaderSection from '../Components/HeaderSection';

interface ConnectionViewProps {

}

const ConnectionView: React.FC<ConnectionViewProps> = () => {
    return (<div>
        <Head>
            <title>Mirth Documentation 2.0</title>
            <link rel="shortcut icon" href="/MD2.png" />
        </Head>
        <HeaderSection></HeaderSection>
    </div>);
}

export default ConnectionView;