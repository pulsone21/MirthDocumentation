import ConnectTable from 'Components/MainComponents/ConnectorTable/ConnectTable';
import Head from 'next/head';
import * as React from 'react';
import HeaderSection from '../Components/HeaderSection';
interface ConnectorTableProps {

}

const ConnectorTable: React.FC<ConnectorTableProps> = () => {

    return (<div>
        <Head>
            <title>Mirth Documentation 2.0</title>
            <link rel="shortcut icon" href="/MDlogoSimplified.png" />
        </Head>
        <HeaderSection></HeaderSection>
        <ConnectTable />
    </div>);
}

export default ConnectorTable;