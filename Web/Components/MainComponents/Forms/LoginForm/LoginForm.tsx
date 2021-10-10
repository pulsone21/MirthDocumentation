import React from 'react'
import { Formik } from "formik";
import InputField from '../../../BasicComponents/Forms/InputField';
import * as Yup from "yup"
import { FaSignInAlt } from "react-icons/fa"

interface LoginformProps {

}

const LoginSchema = Yup.object().shape({
    Username: Yup.string()
        .min(3, "too Short!")
        .max(50, "too Long!")
        .required("Required!"),
    Password: Yup.string()
        .min(5, "Too Short!")
        .required("Required!"),
})


const Loginform: React.FC<LoginformProps> = ({ }) => {
    return (
        <Formik
            initialValues={{ Username: "", Password: "" }}
            validationSchema={LoginSchema}
            onSubmit={values => { console.log(JSON.stringify(values, null, 2)) }}
        >
            {({ handleSubmit }) => (
                <form className="RegisterForm" onSubmit={handleSubmit}>
                    <h2 className="HeaderText">Login</h2>
                    <InputField id="username" name="Username" placeholder="username"></InputField>
                    <InputField id="password" name="Password" placeholder="password" type="password" ></InputField>
                    <button className="baseBtn" type="submit"><FaSignInAlt style={{ marginRight: "15px", alignSelf: "center" }} />Login</button>
                </form>
            )}
        </Formik>
    );
}
export default Loginform;