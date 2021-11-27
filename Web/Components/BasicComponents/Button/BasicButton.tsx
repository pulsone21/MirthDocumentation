import React, { HTMLAttributes } from 'react';
import styles from "../../../styles/Module/Components/basicComponents/button.module.css"

export type BasicButtonProps = HTMLAttributes<HTMLDivElement>

const BasicButton: React.FC<BasicButtonProps> = ({ className, ...props }) => {
    let classNames
    if (className) {
        classNames = className
    } else {
        classNames = styles.baseBtn
    }

    return (
        <div className={classNames} onClick={props.onClick}><p>{props.title}</p></div>
    );
}

export default BasicButton;
