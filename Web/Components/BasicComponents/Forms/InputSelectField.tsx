import { FieldProps, useField, } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import { dropDownElement } from "Types/dropDownElement";


type CustomSelectProps = FieldProps & {
    options: dropDownElement[];
    isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);

    const onChange = (newValue: any | null) => {
        if (!newValue) {
            setValue(state.initialValue)
        } else {
            setValue(newValue.value);
        }
    };

    return (
        <Select isClearable={true} onChange={(newValue) => onChange(newValue)} options={props.options} isMulti={props.isMulti} />
    );
};

export default CustomSelect;