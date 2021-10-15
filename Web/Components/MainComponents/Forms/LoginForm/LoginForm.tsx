import React from 'react'
import { Formik } from "formik";
import InputField from '../../../BasicComponents/Forms/InputField';
import { FaSignInAlt } from "react-icons/fa"
import { useLogInMutation } from 'GraphQl/generated/graphgql';
import { ObjectToErrorMap } from 'CodeBase/Utils';

interface LoginformProps {

}


const Loginform: React.FC<LoginformProps> = ({ }) => {
    const [, login] = useLogInMutation();

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await login(values);
                console.log(response);
                if (response.data?.Login.Errors) {
                    setErrors(ObjectToErrorMap(response.data.Login.Errors))
                }
            }}
        >
            {({ handleSubmit }) => (
                <form className="RegisterForm" onSubmit={handleSubmit}>
                    <h2 className="HeaderText">Login</h2>
                    <InputField id="username" name="username" placeholder="Username"></InputField>
                    <InputField id="password" name="password" placeholder="Password" type="password" ></InputField>
                    <button className="baseBtn" type="submit"><FaSignInAlt style={{ marginRight: "15px", alignSelf: "center" }} />Login</button>
                </form>
            )}
        </Formik>
    );
}
export default Loginform;