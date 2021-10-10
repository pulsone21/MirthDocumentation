import React from 'react';


interface BasicButtonProps {
    btnName: string
    btnFunction?: (any: any) => void
    classes?: string[]
}

const BasicButton: React.FC<BasicButtonProps> = (props) => {
    return (
        <div className={(props.classes) ? GetClassNames(props.classes) : "baseBtn"} onClick={(props.btnFunction) ? props.btnFunction : undefined}><p>{props.btnName}</p></div>
    );
}

export default BasicButton;


function GetClassNames(classNameArray: string[]): string {
    let classNames = "baseBtn ";
    classNameArray.forEach(el => {
        classNames += el + " ";
    })
    return classNames.substring(0, classNames.length - 1);
}