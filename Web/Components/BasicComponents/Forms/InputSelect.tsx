import React, { useState } from 'react'
import { dropDownElement } from 'Types/dropDownElement'

type InputSelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string
    listContent: dropDownElement[]
}


const InputSelect: React.FC<InputSelectProps> = ({ name, listContent, ...props }) => {
    const [dropDownClasses, setDropDownClasses] = useState("dropDown hide")
    let startList: dropDownElement[];
    if (listContent.length > 0) {
        startList = listContent
    } else {
        startList = [{ longName: "", key: "", shortName: "" }]
    }
    const [items, _] = useState(startList)

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input name={name} type="text" placeholder={props.placeholder} onFocus={() => setDropDownClasses("dropDown")} onBlur={() => setDropDownClasses("dropDown hide")} />
            <div className={dropDownClasses}>
                {items.map((el, index) => (
                    <div className="dropDownElement" key={index} id={el.key}>{el.longName}</div>
                ))}
            </div>
        </div>
    );
}
export default InputSelect;