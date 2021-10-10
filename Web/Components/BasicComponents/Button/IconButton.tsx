import React, { HTMLAttributes } from 'react';

type IconButtonProps = HTMLAttributes<HTMLDivElement>


const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <div id={props.id} className={props.className} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default IconButton;
