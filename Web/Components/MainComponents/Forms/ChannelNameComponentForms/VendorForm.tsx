import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik } from 'formik';
import { useCreateVendorMutation } from 'GraphQl/generated/graphgql';
import React from 'react'
import styles from "../../../../styles/Module/Components/mainComponents/vendorForm.module.css"
import btnStyles from "../../../../styles/Module/Components/basicComponents/button.module.css"
interface VendorFormProps {
    initialValues?: VendorInitialValues
}

export interface VendorInitialValues {
    shortName: string,
    longName: string,
    application: string
}

let initValues = {
    shortName: "",
    longName: "",
    application: ""
}

const VendorForm: React.FC<VendorFormProps> = ({ initialValues }) => {

    const [, CreateVendor] = useCreateVendorMutation()
    if (initialValues) initValues = initialValues

    return (
        <Formik
            initialValues={initValues}
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
                    <h2 className={styles.FormHeader}>Create new Vendor</h2>
                    <InputField name="longName" id="longName" placeholder="Longname of the vendor"></InputField>
                    <InputField name="shortName" id="shortName" placeholder="Shortname for the vendor"></InputField>
                    <InputField name="application" id="application" placeholder="link application by longname"></InputField>
                    <button style={{ width: "90%", marginTop: "0.75rem" }} className={btnStyles.baseBtn} type="submit"><p>Create</p></button>
                </form>
            )}
        </Formik>
    );
}
export default VendorForm;