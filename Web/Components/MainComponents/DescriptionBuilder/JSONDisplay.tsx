import * as React from 'react';
import copy from "copy-to-clipboard"

type JSONDisplayProps = {
    JsonToDisplay: string
    // clickEvent: (string: string) => {}
}


const JSONDisplay: React.FC<JSONDisplayProps> = ({ JsonToDisplay }) => {

    const [copieMessage, setCopieMessage] = React.useState("Click to copy the description")
    const [copieMessageClasses, setCopieMessageClasses] = React.useState("copieMessage")

    const handleonClick = (string: string) => {
        copy(string, { message: "JSON copied to clipboard" })
        setCopieMessage("Description copied to clipboard")
        setCopieMessageClasses(prevState => `${prevState} copied`)
    }
    return (
        <div className="outer" >
            <div onClick={() => handleonClick(JsonToDisplay)} className="codeContainer" >
                <pre>{JsonToDisplay}</pre>

            </div>
            <p className={copieMessageClasses}>{copieMessage}</p>
        </div>

    );
}

export default JSONDisplay;
