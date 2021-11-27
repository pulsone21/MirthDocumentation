import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'
import { LableSide } from "../../../Types/lableSideType"
import styles from "../../../styles/Module/Components/InputField.module.css"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    name: string;
    type?: string;
    LableSide?: LableSide;
}
const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, { error }] = useField(props)

    return (
        <div className={styles.FieldContainer}>
            <label style={{ marginRight: "5px" }} className="ArticalText" htmlFor={props.id}>{props.name}</label>
            <input className={"ArticalText " + styles.textInput} autoComplete="off"
                {...field}
                id={props.id}
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder}
            />
            {error ? <p className={styles.ErrorMessage}>{error}</p> : null}
        </div>
    );
}
export default InputField;
