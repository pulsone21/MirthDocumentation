import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from '../../../BasicComponents/Forms/InputField';
import InputSelect from '../../../BasicComponents/Forms/InputSelect';
import { Formik } from 'formik';
import { useCreateApplicationMutation } from 'GraphQl/generated/graphgql';
import React from 'react'
import { dropDownElement } from 'Types/dropDownElement';
import DropZone from 'Components/BasicComponents/Forms/DropZone';
import { Upload } from "../../../../Types/UploadType";
import { extractFiles } from 'extract-files';

interface ApplicationFormProps {
    vendorList: dropDownElement[]
}

interface initVal {
    shortName: string,
    longName: string,
    vendor: any,
    logo: Upload | undefined
}

const initialValues: initVal = {
    shortName: "",
    longName: "",
    vendor: "",
    logo: undefined,
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ vendorList }) => {
    const [, createApplication] = useCreateApplicationMutation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        console.log(event)
        if (event.currentTarget.files) {
            console.log(event.currentTarget.files[0])
            setFieldValue("logo", event.currentTarget.files[0])
        }
    }
    return (
        <Formik
            initialValues={initialValues}
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
                    <h2>Create new Application</h2>
                    <InputField name="longName" id="longName" placeholder={`Longname of the Application`}></InputField>
                    <InputField name="shortName" id="shortName" placeholder={`Shortname for the Application`}></InputField>
                    <InputSelect handleChange={(newValue) => values.vendor = newValue.value} name="vendor" id="vendor" placeholder="Seach for an Vendor" listContent={vendorList} />
                    <input id="logo" name="logo" type="file" onChange={(event) => handleChange(event, setFieldValue)} />
                    {/* <DropZone formikHandler={setFieldValue} /> */}
                    <button className="navBtn" type="submit">Create</button>
                </form>
            )}
        </Formik>
    )

}
export default ApplicationForm;