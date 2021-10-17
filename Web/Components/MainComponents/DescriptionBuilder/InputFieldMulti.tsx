import React, { InputHTMLAttributes } from 'react';
import { FieldArray, Field } from 'formik';
import { FaPlus } from "react-icons/fa"
import { LableSide } from 'Types/lableSideType';


type InputFieldMultiProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    fieldList: string[]
    type?: string;
    LableSide?: LableSide;
}


const InputFieldMulti: React.FC<InputFieldMultiProps> = (props) => {
    // const [field, { error }] = useField(props);
    return (
        <div className="MultiFieldOuterContainer">
            <p className="MultiFieldLabel">{props.name}</p>
            <FieldArray name={props.name}>
                {(fieldArrayProps) => (
                    <div className="MultiFieldInnerContainer">
                        <button className="baseBtn addDescriptionFieldBtn" type="button" onClick={() => fieldArrayProps.push('')}><FaPlus /></button>
                        <div className="FieldList">
                            {props.fieldList && props.fieldList.length > 0 ? (
                                props.fieldList.map((_, index) => {
                                    return < Field key={index} id={`${props.name}.${index}`} name={`${props.name}[${index}]`} placeholder={props.placeholder} autoComplete="off" />
                                })
                            ) : (
                                <button className="baseBtn addDescriptionFieldBtn" type="button" onClick={() => fieldArrayProps.push('')}><FaPlus /></button>
                            )}
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    );
}

export default InputFieldMulti;
