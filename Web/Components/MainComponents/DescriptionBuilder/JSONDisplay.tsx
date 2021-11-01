import * as React from 'react';
import copy from "copy-to-clipboard"

type JSONDisplayProps = {
    JsonToDisplay: string
    // clickEvent: (string: string) => {}
}


const JSONDisplay: React.FC<JSONDisplayProps> = ({ JsonToDisplay }) => {

    const [prevJson, setPrevJson] = React.useState("")
    const [copieMessage, setCopieMessage] = React.useState("Click to copy the description")
    const [copieMessageClasses, setCopieMessageClasses] = React.useState("copieMessage")

    const handleonClick = () => {
        copy(JsonToDisplay)
        setCopieMessage("Description copied to clipboard")
        setCopieMessageClasses(prevState => `${prevState} copied`)
    }

    React.useEffect(() => {
        console.log("prevJSON", prevJson)
        console.log("jsonToDisplay", JsonToDisplay)
        if (prevJson != JsonToDisplay) {
            setCopieMessage("Click to copy the description")
            setCopieMessageClasses("copieMessage")
            setPrevJson(JsonToDisplay)
        }
    }, [prevJson, JsonToDisplay])

    return (
        <div className="outer" >
            <div onClick={() => handleonClick()} className="codeContainer" >
                <pre>{JsonToDisplay}</pre>

            </div>
            <p className={copieMessageClasses}>{copieMessage}</p>
        </div>

    );
}

export default JSONDisplay;