import HeaderSection from 'Components/HeaderSection';
import Head from 'next/head';
import React from 'react'

interface ApplicationTreeProps {

}

const ApplicationTree: React.FC<ApplicationTreeProps> = ({ }) => {
    return (
        <div>
            <Head>
                <title>Mirth Documentation 2.0 - Application Tree</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div className="MainComponentContainer" style={{ marginTop: "35px" }} >
                Henlo
            </div>

        </div>
    );
}
export default ApplicationTree;