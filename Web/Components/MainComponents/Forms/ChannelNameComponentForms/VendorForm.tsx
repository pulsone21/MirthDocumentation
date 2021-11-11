import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik } from 'formik';
import { useCreateVendorMutation } from 'GraphQl/generated/graphgql';
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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors, resetForm }) => {
                const vend = await CreateVendor({ shortName: values.shortName, longName: values.longName, appLongname: values.application })

                if (vend.data?.CreateVendor.Errors) {
                    setErrors((ObjectToErrorMap(vend.data?.CreateVendor.Errors)))
                } else {
                    resetForm()
                }
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2>Create new Vendor</h2>
                    <InputField name="longName" id="longName" placeholder="Longname of the vendor"></InputField>
                    <InputField name="shortName" id="shortName" placeholder="Shortname for the vendor"></InputField>
                    <InputField name="application" id="application" placeholder="link application by longname"></InputField>
                    <button className="w-11/12 mt-3 baseBtn" type="submit"><p>Create</p></button>
                </form>
            )}
        </Formik>
    );
}
export default VendorForm;