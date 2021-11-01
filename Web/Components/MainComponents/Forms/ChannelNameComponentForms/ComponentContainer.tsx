import React, { useState } from 'react'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import ApplicationForm from './ApplicationForm';
import BaseChannelComponentForm from './BaseChannelComponentForm';
import VendorForm from './VendorForm';

interface ComponentContainerProps {
    componentName: "Application" | "DataType" | "DataArea" | "DataTopic" | "Vendor"

}

const ComponentContainer: React.FC<ComponentContainerProps> = ({ componentName }) => {
    const [myState, setMyState] = useState(false)

    let html: any;
    switch (componentName) {
        case "Vendor":
            html = <VendorForm />
            break;
        case "Application":
            html = <ApplicationForm />
            break;
        default:
            html = <BaseChannelComponentForm componentName={componentName} />
            break;
    }

    return (
        <div className="container">
            {myState ?
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {html}
                    <FaMinusSquare className="iconButton" onClick={() => setMyState(false)} />
                </div> :
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <p className="ContainerPalceholder">Create {componentName}</p>
                    <FaPlusSquare className="iconButton" onClick={() => setMyState(true)} />
                </div>
            }
        </div>
    );
}
export default ComponentContainer;