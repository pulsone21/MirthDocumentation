import { ObjectToErrorMap } from 'CodeBase/Utils';
import InputField from 'Components/BasicComponents/Forms/InputField';
import { Formik } from 'formik';
import { useCreateDataAreaMutation, useCreateDataTopicMutation, useCreateDataTypeMutation } from 'GraphQl/generated/graphgql';
import React from 'react'
import btnStyles from "../../../../styles/Module/Components/basicComponents/button.module.css"
import styles from "../../../../styles/Module/Components/mainComponents/basicChannelComponentForm.module.css"
interface BaseChannelComponentFormProps {
    componentName: "DataType" | "DataArea" | "DataTopic"
}

const initialValues = {
    shortName: "",
    longName: ""
}

const BaseChannelComponentForm: React.FC<BaseChannelComponentFormProps> = ({ componentName }) => {
    const [, createDataType] = useCreateDataTypeMutation();
    const [, createDataArea] = useCreateDataAreaMutation();
    const [, createDataTopic] = useCreateDataTopicMutation();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors, resetForm }) => {
                const { shortName, longName } = values
                let response;
                let errors = false;
                switch (componentName) {
                    case "DataType":
                        response = await createDataType({ shortName, longName, });
                        if (response.data?.CreateDataType.Errors) {
                            setErrors(ObjectToErrorMap(response.data.CreateDataType.Errors))
                            errors = true
                        }
                        console.log(response.data?.CreateDataType.DataType)
                        break;
                    case "DataArea":
                        response = await createDataArea({ shortName, longName, });
                        if (response.data?.CreateDataArea.Errors) {
                            setErrors(ObjectToErrorMap(response.data.CreateDataArea.Errors))
                            errors = true
                        }
                        console.log(response.data?.CreateDataArea.DataArea)
                        break;
                    case "DataTopic":
                        response = await createDataTopic({ shortName, longName, });
                        if (response.data?.CreateDataTopic.Errors) {
                            setErrors(ObjectToErrorMap(response.data.CreateDataTopic.Errors))
                            errors = true
                        }
                        break;
                }
                if (!errors) resetForm()
            }}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className={styles.FormHeader}>{`Create new ${componentName}`}</h2>
                    <InputField name="longName" id="longName" placeholder={`Longname of the ${componentName}`}></InputField>
                    <InputField name="shortName" id="shortName" placeholder={`Shortname for the ${componentName}`}></InputField>
                    <button style={{ width: "90%", marginTop: "0.75rem" }} className={btnStyles.baseBtn} type="submit"><p>Create</p></button>
                </form>
            )}
        </Formik>
    );
}
export default BaseChannelComponentForm;
