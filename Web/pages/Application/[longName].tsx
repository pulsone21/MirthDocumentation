import React, { useState } from 'react'
import { useRouter } from "next/router"
import { useGetApplicationByLongNameQuery } from 'GraphQl/generated/graphgql';
import Head from 'next/head';
import HeaderSection from 'Components/HeaderSection';
import { appInitValues } from 'Components/MainComponents/Forms/ChannelNameComponentForms/ApplicationForm';

interface ApplicationProps {

}

const Application: React.FC<ApplicationProps> = ({ }) => {
    const router = useRouter()
    const { longName } = router.query;
    const [appFormInitValues, SetAppFormInitValues] = useState<appInitValues>()

    let lN = "";
    if (longName) lN = longName as string
    const [{ data, fetching, error }] = useGetApplicationByLongNameQuery({ variables: { longName: lN } })

    let AppForm;
    if (fetching) {
        AppForm = (<p>FETCHING</p>)
    } else if (error) {
        AppForm = (<p>{error}</p>)
    } else if (data?.GetApplicationByLongName.Errors) {
        AppForm = (<p>{JSON.stringify(data.GetApplicationByLongName.Errors, null, 4)}</p>)
    } else if (data?.GetApplicationByLongName.Application) {
        SetAppFormInitValues({
            vendor: vendData.GetVendorByLongName.Vendor?.longName,
            longName: data.GetApplicationByLongName.Application.longName,
            shortName: data.GetApplicationByLongName.Application.shortName,
            logo: undefined
        })
    }


    return (
        <>
            <Head>
                <title>Mirth Documentation 2.0 - Application {longName}</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
        </>
    );
}
export default Application;