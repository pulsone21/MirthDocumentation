import React, { HTMLAttributes } from 'react';

type IconButtonProps = HTMLAttributes<HTMLDivElement>


const IconButton: React.FC<IconButtonProps> = (props) => {
    let className = "baseBtn"
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
