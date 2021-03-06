import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik, FormikValues } from 'formik';
import Head from 'next/head';
import React, { useState } from 'react';
import HeaderSection from '../Components/HeaderSection';
import InputFieldMulti from '../Components/BasicComponents/Forms/InputFieldMulti';
import JSONDisplay from "../Components/MainComponents/DescriptionBuilder/JSONDisplay";
import styles from "../styles/Module/Pages/DescriptionBuilder.module.css"
import btnStyles from "../styles/Module/Components/basicComponents/button.module.css"


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

    const handleChange = (values: FormikValues) => {
        SetJsonField(JSON.stringify(values, null, 4))
    }

    return (
        <div>
            <Head>
                <title>Mirth Documentation 2.0</title>
                <link rel="shortcut icon" href="/MDlogoSimplified.png" />
            </Head>
            <HeaderSection></HeaderSection>
            <div className={styles["Descriptionbuilder-Container"]}>
                <div className={styles.colLeft}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(_, { resetForm }) => { resetForm() }}

                        enableReinitialize={false}
                    >
                        {({ values }) => (
                            <form onChange={() => handleChange(values)}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h1 className="HeaderTitle">Description Builder</h1>
                                    <button style={{ maxHeight: "35px", alignSelf: "flex-end", marginTop: "15px !important", marginLeft: "0px !important" }} className={btnStyles.navBtn} type="submit" >Clear Fields</button>
                                </div>
                                <InputField LableSide="left" id="description" name="description" placeholder="main description" />
                                <InputField LableSide="left" id="comment" name="comment" placeholder="special things" />
                                <InputField LableSide="left" id="documentation Link" name="documentationLink" placeholder="link to the documentation" />
                                <InputField LableSide="left" id="source" name="source" placeholder="source system/directory contact" />
                                <InputField LableSide="left" id="creation" name="creation" placeholder="creation date/ creator" />
                                <InputFieldMulti fieldList={values.destinations} id="destinations" name="destinations" placeholder="destination system/directory contact" />
                                <InputFieldMulti fieldList={values.changes} LableSide="left" id="changes" name="changes" placeholder="what when why who" />
                                <InputFieldMulti fieldList={values["known issues"]} LableSide="left" id="known issues" name="known issues" placeholder="what/resolution steps" />
                                <InputFieldMulti fieldList={values["tags/keywords"]} LableSide="left" id="tags/keywords" name="tags/keywords" placeholder="search tags/keywords parameter" />
                            </form>
                        )}
                    </Formik>
                </div>
                <div className={styles.colRight}>
                    <JSONDisplay JsonToDisplay={jsonField} />
                </div>
            </div>
        </div>
    );
}

export default DescriptionBuilder;


