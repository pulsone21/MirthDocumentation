import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'
import { LableSide } from "../../../Types/lableSideType"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    name: string;
    type?: string;
    LableSide?: LableSide;
}
const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, { error }] = useField(props)

    return (
        <div className="FieldContainer">
            <label className="SubTitle text-colorSecondaryHighlight mr-5" htmlFor={props.id}>{props.name}</label>
            <input className="ArticalText color bg-colorPrimary text-colorTertiary p-1 inputHover" autoComplete="off"
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
