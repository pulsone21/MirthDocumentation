import React, { HTMLAttributes } from 'react';
import styles from "../../../styles/Module/Components/button.module.css"
type IconButtonProps = HTMLAttributes<HTMLDivElement>


const IconButton: React.FC<IconButtonProps> = (props) => {
    let className = styles.baseBtn
    if (props.className) {
        className = props.className;
    }
    return (
        <div id={props.id} className={className} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default IconButton;
