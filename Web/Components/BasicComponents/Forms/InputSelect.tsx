import React, { InputHTMLAttributes, useState } from 'react'
import { dropDownElement } from '../../../Types/dropDownElement'
import Select, { StylesConfig } from 'react-select'
import { useField } from 'formik';
import { customStyles } from './styleConfig';
import styleInput from "../../../styles/Module/Components/basicComponents/InputField.module.css";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    listContent: dropDownElement[]
    handleChange: (value: any) => {}
    defaultValue?: string
}

let styles: StylesConfig = {
    ...customStyles,
    container: (provided, _state) => ({
        ...provided,
        margin: "0px",
        width: "280px",
    }),
}
const InputSelect: React.FC<InputSelectProps> = (props) => {
    const [, { error }] = useField(props)
    const [defValue, setDefValue] = useState<dropDownElement[]>();

    if (props.defaultValue) {
        setDefValue(props.listContent.filter(option => option.label === props.defaultValue))
    }

    const onChange = (newValue: unknown) => {
        props.handleChange(newValue)
        console.log(newValue)
        //@ts-ignore -> newValue is unknown from the select element but it is save an dorpDownElement
        setDefValue(props.listContent.filter(option => option.label === newValue.label))
    }

    return (
        <div className={styleInput.FieldContainer}>
            <label style={{ marginRight: "5px" }} className="ArticalText" htmlFor={props.name}>{props.name}</label>
            <Select value={defValue} styles={styles} onChange={(newValue) => onChange(newValue)} placeholder={props.placeholder} options={props.listContent} />
            {error ? <p className={styleInput.ErrorMessage}>{error}</p> : null}
        </div>
    );
}
export default InputSelect;