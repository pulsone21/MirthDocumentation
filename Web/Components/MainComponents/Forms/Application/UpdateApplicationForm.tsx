import React from 'react'
import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from '../../../BasicComponents/Forms/InputField';
import InputSelect from '../../../BasicComponents/Forms/InputSelect';
import { Formik } from 'formik';
import { useCreateApplicationMutation } from 'GraphQl/generated/graphgql';
import { dropDownElement } from 'Types/dropDownElement';
import { Upload } from "../../../../Types/UploadType";
import DropZone from 'Components/BasicComponents/Forms/DropZone';
import btnStyles from "../../../../styles/Module/Components/basicComponents/button.module.css"
import Image from "next/image"

interface ApplicationFormProps {
    vendorList: dropDownElement[]
    initialValues?: appInitValues
    logoPath?: string | undefined
}

export interface appInitValues {
    shortName: string,
    longName: string,
    vendor: any,
    logo: Upload | undefined
}

let appInitialValues: appInitValues = {
    shortName: "",
    longName: "",
    vendor: "",
    logo: undefined,
}

const UpdateApplicationForm: React.FC<ApplicationFormProps> = ({ vendorList, initialValues, logoPath }) => {
    const [, createApplication] = useCreateApplicationMutation();

    if (initialValues) {
        appInitialValues = initialValues;
    }

    return (
        <Formik
            initialValues={appInitialValues}
            onSubmit={async (values, { setErrors, resetForm }) => {
                console.log(values)
                const { shortName, longName, vendor, logo } = values
                const response = await createApplication({ shortName, longName, vendorId: vendor, logo });
                if (response.data?.CreateApplication.Errors) {
                    setErrors(ObjectToErrorMap(response.data.CreateApplication.Errors))
                } else {
                    resetForm()
                }
            }}>
            {({ values, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h2 className="SubTitle">Update Application {`- ${initialValues?.longName}` || ""}</h2>
                        {logoPath ? <Image src={logoPath} alt="Input Preview" width={250} height={150} /> : null}
                    </div>
                    <InputField name="longName" id="longName" width="100%" placeholder={`Longname of the Application`} />
                    <InputField name="shortName" id="shortName" placeholder={`Shortname for the Application`} />
                    <InputSelect defaultValue={values.vendor} setFieldValue={setFieldValue} name="vendor" id="vendor" placeholder="Seach for an Vendor" listContent={vendorList} />
                    <DropZone formikHandler={setFieldValue} />
                    <button style={{ width: "90%", marginTop: "0.75rem" }} className={btnStyles.baseBtn} type="submit"><p>Update</p></button>
                </form>
            )}
        </Formik>
    )
}
export default UpdateApplicationForm;