import React from 'react'
import { useRouter } from "next/router"
import { useGetAllVendorsQuery, useGetApplicationByLongNameQuery } from 'GraphQl/generated/graphgql';
import Head from 'next/head';
import HeaderSection from 'Components/HeaderSection';
import { appInitValues } from 'Components/MainComponents/Forms/Application/createNewApplicationForm';
import { dropDownElement } from 'Types/dropDownElement';
import { GenerateDopDownFromQuery } from 'CodeBase/Utils';
import UpdateApplicationForm from 'Components/MainComponents/Forms/Application/UpdateApplicationForm';

interface ApplicationProps {

}

const Application: React.FC<ApplicationProps> = ({ }) => {
    const router = useRouter()
    const longName = typeof router.query.longName === "string" ? router.query.longName : "";
    const [{ data, fetching, error }] = useGetApplicationByLongNameQuery({ variables: { longName } })
    const [{ data: rawVendData }] = useGetAllVendorsQuery();

    let vendData: dropDownElement[] = []
    if (rawVendData?.GetAllVendors) vendData = GenerateDopDownFromQuery(rawVendData.GetAllVendors)

    let appText;
    if (fetching) {
        appText = (<p>FETCHING...</p>)
    } else if (error) {
        appText = (<p>{error.message}</p>)
    } else if (data?.GetApplicationByLongName.Errors) {
        appText = (<p>{JSON.stringify(data.GetApplicationByLongName.Errors, null, 4)}</p>) //TODO built out a correct error display
    } else if (data?.GetApplicationByLongName.Application) {
        let initVals: appInitValues = {
            logo: undefined,
            longName: data.GetApplicationByLongName.Application.longName,
            shortName: data.GetApplicationByLongName.Application.shortName,
            vendor: data.GetApplicationByLongName.Application.vendor.longName,
        }
        appText = (<UpdateApplicationForm initialValues={initVals} vendorList={vendData} />)
    }


    return (
        <>
            <Head>
                <title>Mirth Documentation 2.0 - Application {longName}</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {appText}
            </div>

        </>
    );
}
export default Application;