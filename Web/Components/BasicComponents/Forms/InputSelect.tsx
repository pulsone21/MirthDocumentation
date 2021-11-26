import React, { InputHTMLAttributes } from 'react'
import { dropDownElement } from '../../../Types/dropDownElement'
import Select, { StylesConfig } from 'react-select'
import { useField } from 'formik';
import { customStyles } from 'Components/MainComponents/Forms/ChannelNameComponentForms/styleConfig';

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

    const defaulVal = () => {
        return props.listContent.filter(option => option.label === props.defaultValue)
    }

    return (
        <div className="FieldContainer">
            <label htmlFor={props.name}>{props.name}</label>
            <Select value={defaulVal()} styles={styles} onChange={(newValue) => props.handleChange(newValue)} placeholder={props.placeholder} options={props.listContent} />
            {error ? <p className="ErrorMessage">{error}</p> : null}
        </div>
    );
}
export default InputSelect;