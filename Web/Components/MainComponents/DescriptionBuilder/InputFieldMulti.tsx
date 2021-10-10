import React, { useState } from 'react';
import Button from "../../BasicComponents/Button/IconButton"
import { CreateClassNamesAsString } from "../../../CodeBase/Utils";


interface InputFieldMultiProps {
    name: string
    placeholder?: string
    classes: string[] | undefined
}

interface InputFieldState {
    inputText: string | null;
}

const InputFieldMulti: React.FC<InputFieldMultiProps> = (props) => {

    const [inputFields, setInputFields] = useState<InputFieldState[]>([{ inputText: "" }]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const values = [...inputFields];
        values[index].inputText = event.target.value;
        setInputFields(values);
    }

    return (
        <div className="inputFieldContainer">
            <p className="SubTitle" >{props.name}</p>
            <div className="outerContainer">
                <Button className="addDescriptionFieldBtn" onClick={() => setInputFields([...inputFields, { inputText: "" }])} />
                <div className="innerContainer">
                    <ul style={{ padding: "0px", listStyle: "none", margin: "0px", width: "100%" }}>
                        {inputFields.map((inputText, index) => (
                            <li style={{ display: "flex" }} key={index}><input autoComplete="off" id={props.name} className={(props.classes) ? CreateClassNamesAsString(props.classes) : ""} placeholder={props.placeholder} type="text" onChange={(event) => handleInputChange(index, event)} /></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>);
}

export default InputFieldMulti;
