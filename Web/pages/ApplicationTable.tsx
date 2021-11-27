
import * as React from 'react';
import HeaderSection from '../Components/HeaderSection';
import Head from 'next/head';
import { useGetAllApplikationsRichQuery, useGetAllVendorsQuery } from 'GraphQl/generated/graphgql';
import { withUrqlClient } from 'next-urql';
import { client } from 'CodeBase/CreateUrqlClient';
import AppTable from '../Components/MainComponents/AppTable/AppTable';
import { GetCorrectedLogoUrl } from 'CodeBase/Utils';

interface ApplicationTableProps {

}

const ApplicationTable: React.FC<ApplicationTableProps> = () => {

    const [{ data: appData, fetching: appFetching, error: appError }] = useGetAllApplikationsRichQuery();
    const [{ data: vendData, fetching: _vendFetch, error: _vendError, }] = useGetAllVendorsQuery();

    let tableHTML;
    let bodyElements: string[][] = [];
    if (appFetching) { tableHTML = (<h1>LOADING</h1>) } //TODO Implement appropriate Loading animation
    else if (appError) { tableHTML = (<h1>Error</h1>) } //TODO Implement appropriate Error handling 
    else if (appData?.GetAllApplikations && vendData?.GetAllVendors) {
        appData.GetAllApplikations.forEach(async appEl => {
            let longName: string = "";
            vendData.GetAllVendors.forEach(venEl => {
                if (appEl.vendor._id == venEl._id) {
                    longName = venEl.longName
                }
            })
            if (longName.length < 1) longName = `Vendor with id: ${appEl.vendor._id} not Found!`
            let logoUrl = ""
            if (appEl.logoUrl != undefined) logoUrl = GetCorrectedLogoUrl(appEl.logoUrl)
            bodyElements.push([logoUrl, appEl.longName, longName, "TBD AppTree", "..."])
        })
        tableHTML = (<AppTable bodyElements={bodyElements}></AppTable>)
    }

    //TODO display a place holder if no content comes back

    return (
        <div>
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div style={{ marginTop: "35px", alignContent: "center", padding: "15px" }} >
                {tableHTML}
            </div>

        </div >);
}

export default withUrqlClient((_ssrExchange, _) => (client))(ApplicationTable);
