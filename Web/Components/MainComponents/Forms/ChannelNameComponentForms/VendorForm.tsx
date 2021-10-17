import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik, FormikValues } from 'formik';
import { useAppByLongNameQuery, useCreateVendorMutation } from 'GraphQl/generated/graphgql';
import React from 'react'

interface VendorFormProps {

}


const initialValues = {
    shortName: "",
    longName: "",
    application: ""
}


const VendorForm: React.FC<VendorFormProps> = ({ }) => {

    const [, CreateVendor] = useCreateVendorMutation()
    const [, GetApp] = useAppByLongNameQuery()


    const submitting = async (values: FormikValues) => {
        console.log(JSON.stringify(values, null, 4))
        const app = await GetApp()

        //Get Application ID 
        //Create Vendor
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                console.log(JSON.stringify(values, null, 4))
                const app = await GetApp(values.application)
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2>Create new Vendor</h2>
                    <InputField name="longName" id="longName" placeholder="Longname of the vendor"></InputField>
                    <InputField name="shortName" id="shortName" placeholder="Shortname for the vendor"></InputField>
                    <InputField name="application" id="application" placeholder="link application by longname"></InputField>
                    <button className="navBtn" type="submit">Create</button>
                </form>
            )}
        </Formik>
    );
}
export default VendorForm;