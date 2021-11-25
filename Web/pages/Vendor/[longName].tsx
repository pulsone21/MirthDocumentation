import HeaderSection from 'Components/HeaderSection'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

interface VendorProps {

}

const Vendor: React.FC<VendorProps> = ({ }) => {
    const router = useRouter()
    const longName = typeof router.query.longName === "string" ? router.query.longName : "";

    const [{ data, fetching, error }] = useGetApplicationByLongNameQuery({ variables: { longName } })
    const [{ data: rawVendData }] = useGetAllVendorsQuery();
    let vendData: dropDownElement[] = []
    if (rawVendData?.GetAllVendors) vendData = GenerateDopDownFromQuery(rawVendData.GetAllVendors)

    let vendText;
    if (fetching) {
        vendText = (<p>FETCHING...</p>)
    } else if (error) {
        vendText = (<p>{error.message}</p>)
    } else if (data?.GetApplicationByLongName.Errors) {
        vendText = (<p>{JSON.stringify(data.GetApplicationByLongName.Errors, null, 4)}</p>)
    } else if (data?.GetApplicationByLongName.Application) {
        let initVals: appInitValues = {
            logo: undefined,
            longName: data.GetApplicationByLongName.Application.longName,
            shortName: data.GetApplicationByLongName.Application.longName,
            vendor: data.GetApplicationByLongName.Application.vendor.longName,
        }
        vendText = (<ApplicationForm initialValues={initVals} vendorList={vendData} />)
    }

    return (
        <>
            <Head>
                <title>Mirth Documentation 2.0 - Application {longName}</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection />
            {vendText}
        </>
    );
}
export default Vendor;