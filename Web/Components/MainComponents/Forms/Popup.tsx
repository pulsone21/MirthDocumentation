import React from 'react'
import { FaTimes } from 'react-icons/fa';
import IconButton from '../../BasicComponents/Button/IconButton';

interface PopupProps {
    trigger: boolean
    children: React.ReactNode
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = (props) => {
    // TODO figure out how to enable onclick for onClick={() => props.setTrigger(false)} 

    return (props.trigger) ? (
        <div className="popupBase" >
            <div className="popUp-inner">
                <IconButton id="closeBtn" onClick={() => props.setTrigger(false)}>
                    <FaTimes color="#c8dbec"></FaTimes>
                </IconButton>
                {props.children}
            </div>
        </div>

    ) : null
}
export default Popup;