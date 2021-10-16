import InputField from 'Components/BasicComponents/Forms/InputField';
import Registerform from 'Components/MainComponents/Forms/RegistertForm/Registerform';
import { Formik, FormikBag, FormikValues } from 'formik';
import Head from 'next/head';
import React, { MouseEventHandler, useState } from 'react';
import HeaderSection from '../Components/HeaderSection';
import InputFieldMulti from '../Components/MainComponents/DescriptionBuilder/InputFieldMulti';
import JSONDisplay from "../Components/MainComponents/DescriptionBuilder/JSONDisplay";


interface DescriptionBuilderProps {

}

const initialValues = {
    description: "",
    comment: "",
    documentationLink: "",
    source: "",
    destinations: [""],
    creation: "",
    changes: [""],
    "known issues": [""],
    "tags/keywords": [""]
}

const DescriptionBuilder: React.FC<DescriptionBuilderProps> = () => {

    const [jsonField, SetJsonField] = useState("fillout the form and hit 'Generate JSON'");

    return (
        <div>
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div className="Descriptionbuilder-Container">
                <div className="colLeft">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500))
                            alert(JSON.stringify(values, null, 4))

                            //SetJsonField(JSON.stringify(values, null, 4))
                        }}
                        enableReinitialize={false}
                    >
                        {({ values, }) => (
                            <form >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h1 className="HeaderText">Description Builder</h1>
                                    <button style={{ maxHeight: "35px", alignSelf: "flex-end" }} className="navBtn" type="reset" >Clear Fields</button>
                                </div>
                                <InputField LableSide="left" id="description" name="description" placeholder="main description" className="articalText" />
                                <InputField LableSide="left" id="comment" name="comment" placeholder="special things" className="articalText" />
                                <InputField LableSide="left" id="documentation Link" name="documentationLink" placeholder="link to the documentation" className="SubTitle" />
                                <InputField LableSide="left" id="source" name="source" placeholder="source system/directory contact" className="articalText" />
                                <InputField LableSide="left" id="creation" name="creation" placeholder="creation date/ creator" className="articalText" />
                                <InputFieldMulti fieldList={values.destinations} id="destinations" name="destinations" placeholder="destination system/directory contact" className="articalText" />
                                <InputFieldMulti fieldList={values.changes} LableSide="left" id="changes" name="changes" placeholder="what when why who" className="articalText" />
                                <InputFieldMulti fieldList={values["known issues"]} LableSide="left" id="known issues" name="known issues" placeholder="what/resolution steps" className="articalText" />
                                <InputFieldMulti fieldList={values["tags/keywords"]} LableSide="left" id="tags/keywords" name="tags/keywords" placeholder="search tags/keywords parameter" className="articalText" />
                                <button style={{ width: "100%" }} className="navBtn baseBtn" type="submit">Generate JSON</button>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="colRight">
                    <JSONDisplay JsonToDisplay={jsonField} />
                </div>
            </div>
        </div>
    );
}

export default DescriptionBuilder;
