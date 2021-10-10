import * as React from 'react';
import { CreateClassNamesAsString } from "../../../CodeBase/Utils"


interface InputFieldSingleProps {
    name: string
    placeholder?: string
    inputclasses: string[] | undefined

}

const InputFieldSingle: React.FC<InputFieldSingleProps> = (props) => {


    return (

        <div className="inputFieldContainer">
            <p className="SubTitle"> {props.name} </p>
            <div className="outerContainer">
                <div className="innerContainer" style={{ marginLeft: "9%" }}>
                    <input type="text" autoComplete="off" id={props.name} className={(props.inputclasses) ? CreateClassNamesAsString(props.inputclasses) : ""} placeholder={props.placeholder} />
                </div>
            </div>
        </div>
    );
}

export default InputFieldSingle;

