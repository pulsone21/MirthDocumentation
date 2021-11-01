import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik } from 'formik';
import { useCreateApplicationMutation } from 'GraphQl/generated/graphgql';
import React from 'react'

interface ApplicationFormProps {

}

const initialValues = {
    shortName: "",
    longName: "",
    vendor: ""
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ }) => {
    const [, createApplication] = useCreateApplicationMutation();
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors, resetForm }) => {
                const { shortName, longName } = values
                const response = await createApplication({ shortName, longName, vendorLongname: values.vendor });
                if (response.data?.CreateApplication.Errors) {
                    setErrors(ObjectToErrorMap(response.data.CreateApplication.Errors))
                } else {
                    resetForm()
                }

            }}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2>{`Create new Application`}</h2>
                    <InputField name="longName" id="longName" placeholder={`Longname of the Application`}></InputField>
                    <InputField name="shortName" id="shortName" placeholder={`Shortname for the Application`}></InputField>
                    <InputField name="vendor" id="vendor" placeholder={`Longname of the vendor`}></InputField>
                    <button className="navBtn" type="submit">Create</button>
                </form>
            )}
        </Formik>
    )

}
export default ApplicationForm;