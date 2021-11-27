import React, { InputHTMLAttributes } from 'react';
import { Field, FieldArray } from 'formik';
import { FaPlus } from "react-icons/fa"
import { LableSide } from 'Types/lableSideType';
import styles from "../../../styles/Module/Components/InputField.module.css"
import IconButton from "../Button/IconButton";
import btnStyles from "../../../styles/Module/Components/button.module.css";


type InputFieldMultiProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    fieldList: string[]
    type?: string;
    LableSide?: LableSide;
}

const InputFieldMulti: React.FC<InputFieldMultiProps> = (props) => {

    return (
        <div className={styles.MultiFieldOuterContainer}>
            <p className={styles.MultiFieldLabel}>{props.name}</p>
            <FieldArray name={props.name}>
                {(fieldArrayProps) => (
                    <div className={styles.MultiFieldInnerContainer}>
                        <IconButton className={btnStyles.baseBtn + " " + btnStyles.addDescriptionFieldBtn} onClick={() => fieldArrayProps.push('')}><FaPlus /></IconButton>
                        <div className={styles.FieldList}>
                            {props.fieldList && props.fieldList.length > 0 ? (
                                props.fieldList.map((_, index) => {
                                    return <Field className={styles.multiTextInput} key={index} id={`${props.name}.${index}`} name={`${props.name}[${index}]`} placeholder={props.placeholder} autoComplete="off" />
                                })
                            ) : (
                                <IconButton className={btnStyles.baseBtn + " " + btnStyles.addDescriptionFieldBtn} onClick={() => fieldArrayProps.push('')}><FaPlus /></IconButton>
                            )}
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    );
}

export default InputFieldMulti;
