import { Formik, useFormik } from 'formik';
import React from 'react';


interface RegisterProps {


}

const Register: React.FC<RegisterProps> = () => {
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2))
        }
    })


    return (
        <Formik>
            <FormControll>

            </FormControll>

        </Formik>

    );
}

export default Register;