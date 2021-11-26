import React, { useState } from 'react'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { dropDownElement } from 'Types/dropDownElement';
import CreateNewApplicationForm from '../Application/createNewApplicationForm';
import BaseChannelComponentForm from './BaseChannelComponentForm';
import VendorForm from './VendorForm';

interface ComponentContainerProps {
    componentName: "Application" | "DataType" | "DataArea" | "DataTopic" | "Vendor"
    vendorList?: dropDownElement[]

}

const ComponentContainer: React.FC<ComponentContainerProps> = ({ componentName, vendorList }) => {
    const [myState, setMyState] = useState(false)

    let html: any;
    switch (componentName) {
        case "Vendor":
            html = <VendorForm />
            break;
        case "Application":
            html = <CreateNewApplicationForm vendorList={vendorList ? vendorList : []} />
            break;
        default:
            html = <BaseChannelComponentForm componentName={componentName} />
            break;
    }

    return (
        <div className="container">
            {myState ?
                (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {html}
                        <FaMinusSquare className="iconButton" style={{ minHeight: "25px", minWidth: "25px" }} onClick={() => setMyState(false)} />
                    </div>
                ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                        <p className="ContainerPalceholder">Create {componentName}</p>
                        <FaPlusSquare className="iconButton" onClick={() => setMyState(true)} />
                    </div>
                )
            }
        </div>
    );
}
export default ComponentContainer;