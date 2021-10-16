import React, { InputHTMLAttributes } from 'react';
import { FieldArray } from 'formik';
import { FaPlus } from "react-icons/fa"
import { LableSide } from 'Types/lableSideType';


type InputFieldMultiProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    fieldList: string[]
    type?: string;
    LableSide?: LableSide;
}


const InputFieldMulti: React.FC<InputFieldMultiProps> = (props) => {


    return (
        <div className="MultiFieldOuterContainer">
            <p className="MultiFieldLabel">{props.name}</p>
            <FieldArray name={props.name}>
                {({ push }) => (
                    <div className="MultiFieldInnerContainer">
                        <button className="baseBtn addDescriptionFieldBtn" type="button" onClick={() => push('')}><FaPlus /></button>
                        <div className="FieldList">
                            {props.fieldList && props.fieldList.length > 0 ? (
                                props.fieldList.map((_, index) => (
                                    <input key={index} id={`${props.name}.${index}`} name={`${props.name}.${index}`} placeholder={props.placeholder} />
                                ))
                            ) : (
                                <button className="baseBtn addDescriptionFieldBtn" type="button" onClick={() => push('')}><FaPlus /></button>
                            )}
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    );
}

export default InputFieldMulti;
