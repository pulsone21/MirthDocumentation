import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from '../../../BasicComponents/Forms/InputField';
import InputSelect from '../../../BasicComponents/Forms/InputSelect';
import { Formik } from 'formik';
import { useCreateApplicationMutation } from 'GraphQl/generated/graphgql';
import React from 'react'
import { dropDownElement } from 'Types/dropDownElement';
import { Upload } from "../../../../Types/UploadType";
import DropZone from 'Components/BasicComponents/Forms/DropZone';
import styles from "../../../../styles/Module/Components/applicationForm.module.css"
import btnStyles from "../../../../styles/Module/Components/button.module.css"

interface ApplicationFormProps {
    vendorList: dropDownElement[]
    initialValues?: appInitValues;
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

const CreateNewApplicationForm: React.FC<ApplicationFormProps> = ({ vendorList, initialValues }) => {
    const [, createApplication] = useCreateApplicationMutation();

    if (initialValues) {
        appInitialValues = initialValues;
    }

    return (
        <Formik
            initialValues={appInitialValues}
            onSubmit={async (values, { setErrors, resetForm }) => {
                console.log(values)
                const { shortName, longName } = values
                const response = await createApplication({ shortName, longName, vendorId: values.vendor, logo: values.logo });
                if (response.data?.CreateApplication.Errors) {
                    setErrors(ObjectToErrorMap(response.data.CreateApplication.Errors))
                } else {
                    resetForm()
                }
            }}>
            {({ values, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className={styles.FormHeader}>Create new Application</h2>
                    <InputField name="longName" id="longName" width="100%" placeholder={`Longname of the Application`} />
                    <InputField name="shortName" id="shortName" placeholder={`Shortname for the Application`} />
                    <InputSelect handleChange={(newValue) => values.vendor = newValue.value} name="vendor" id="vendor" placeholder="Seach for an Vendor" listContent={vendorList} />
                    <DropZone formikHandler={setFieldValue} />
                    <button style={{ width: "90%", marginTop: "0.75rem" }} className={btnStyles.baseBtn} type="submit"><p>Create</p></button>
                </form>
            )}
        </Formik>
    )

}
export default CreateNewApplicationForm;