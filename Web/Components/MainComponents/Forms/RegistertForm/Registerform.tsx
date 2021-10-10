import React from 'react'
import { Formik } from "formik";
import InputField from '../../../BasicComponents/Forms/InputField';
import { FaUserPlus } from 'react-icons/fa';
import { useRegisterMutation } from '../../../../GraphQl/generated/graphgql';
import { ObjectToErrorMap } from "../../../../CodeBase/Utils"

interface RegisterformProps {

}

const Registerform: React.FC<RegisterformProps> = ({ }) => {

    const [, register] = useRegisterMutation();

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await register(values);
                console.log(response)
                if (response.data?.RegisterUser.Errors) {
                    setErrors(ObjectToErrorMap(response.data.RegisterUser.Errors))
                }
            }}
        >
            {({ handleSubmit }) => (
                <form className="RegisterForm" onSubmit={handleSubmit}>
                    <h2 className="HeaderText">Register Form</h2>
                    <InputField id="username" name="username" placeholder="Username"></InputField>
                    <InputField id="password" name="password" placeholder="Password" type="password" ></InputField>
                    <button className="baseBtn" type="submit"><FaUserPlus style={{ marginRight: "15px", alignSelf: "center" }} />Register</button>
                </form>
            )}
        </Formik >
    );
}
export default Registerform;