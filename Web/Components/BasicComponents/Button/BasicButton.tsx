import React, { HTMLAttributes } from 'react';


export type BasicButtonProps = HTMLAttributes<HTMLDivElement>

const BasicButton: React.FC<BasicButtonProps> = ({ className, ...props }) => {
    let classNames
    if (className) {
        classNames = className
    } else {
        classNames = "baseBtn"
    }

    return (
        <div className={classNames} onClick={props.onClick}><p>{props.title}</p></div>
    );
}

export default BasicButton;
