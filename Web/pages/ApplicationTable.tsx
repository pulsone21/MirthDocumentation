import BasicTable from '../Components/BasicComponents/Table/BasicTable';
import * as React from 'react';
import HeaderSection from '../Components/HeaderSection';
import Head from 'next/head';
import { useGetAllApplikationsQuery } from 'GraphQl/generated/graphgql';

interface ApplicationTableProps {

}

const ApplicationTable: React.FC<ApplicationTableProps> = () => {

    const [{ data, fetching, error }] = useGetAllApplikationsQuery();
    let tableHTML;
    const headerElements = ["Application Logo", "Applicationname", "Vendorname", "Tags", "Link"];

    if (fetching) { tableHTML = (<h1>LOADING</h1>) } //TODO Implement Loading animation
    else if (error) { tableHTML = (<h1>Error</h1>) } //TODO Implement Error handling 
    else if (data?.GetAllApplikations) {


        const bodyElements = [["Test1", "Test1", "Test1", "Test1"], ["Test1", "Test1", "Test1", "Test1"], ["Test1", "Test1", "Test1", "Test1"], ["Test1", "Test1", "Test1", "Test1"]];


        tableHTML = (<BasicTable tableStyling="applicationTable" bodyElements={bodyElements} headerElements={headerElements}></BasicTable>)
    }




    return (
        <div>
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div className="MainComponentContainer" style={{ marginTop: "35px" }} >
                {tableHTML}
            </div>

        </div>);
}

export default ApplicationTable;