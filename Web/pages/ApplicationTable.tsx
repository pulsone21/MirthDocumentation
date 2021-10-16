import BasicTable from '../Components/BasicComponents/Table/BasicTable';
import * as React from 'react';
import HeaderSection from '../Components/HeaderSection';
import Head from 'next/head';

interface ApplicationTableProps {

}

const ApplicationTable: React.FC<ApplicationTableProps> = () => {
    const bodyElements = [["Test1", "Test1", "Test1", "Test1"], ["Test1", "Test1", "Test1", "Test1"], ["Test1", "Test1", "Test1", "Test1"], ["Test1", "Test1", "Test1", "Test1"]];
    const headerElements = ["Test1", "Test1", "Test1", "Test1"];

    return (
        <div>
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div className="MainComponentContainer" style={{ marginTop: "35px" }} >
                <BasicTable tableStyling="applicationTable" bodyElements={bodyElements} headerElements={headerElements}></BasicTable>
            </div>

        </div>);
}

export default ApplicationTable;