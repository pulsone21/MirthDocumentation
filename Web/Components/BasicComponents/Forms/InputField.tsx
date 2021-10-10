import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    name: string;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, { error }] = useField(props)

    return (
        <div className="FieldContainer">
            <label htmlFor={props.id}>{props.name}</label>
            <input autoComplete="off"
                {...field}
                id={props.id}
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder}
            />
            {error ? <p className="ErrorMessage">{error}</p> : null}
        </div>
    );
}
export default InputField;