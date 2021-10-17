import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik, FormikValues } from 'formik';
import React from 'react'

interface BaseChannelComponentFormProps {
    componentName: string
}

const initialValues = {
    shortName: "",
    longName: ""
}


const BaseChannelComponentForm: React.FC<BaseChannelComponentFormProps> = ({ componentName }) => {
    const handleSubmit = (values: FormikValues) => {
        console.log(JSON.stringify(values, null, 4))

        //Create component
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ }) => (
                <form>
                    <h2>{`Create new ${componentName}`}</h2>
                    <InputField name="longName" id="longName" placeholder={`Longname of the ${componentName}`}></InputField>
                    <InputField name="shortName" id="shortName" placeholder={`Shortname for the ${componentName}`}></InputField>
                    <button className="navBtn" type="submit">Create</button>
                </form>
            )}
        </Formik>
    );
}
export default BaseChannelComponentForm;