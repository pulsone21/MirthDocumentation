import * as React from 'react';
import copy from "copy-to-clipboard"
import styles from "../../../styles/Module/Components/basicComponents/jsonDisplay.module.css"

type JSONDisplayProps = {
    JsonToDisplay: string
    // clickEvent: (string: string) => {}
}


const JSONDisplay: React.FC<JSONDisplayProps> = ({ JsonToDisplay }) => {

    const [prevJson, setPrevJson] = React.useState("")
    const [copieMessage, setCopieMessage] = React.useState("Click to copy the description")
    const [copieMessageClasses, setCopieMessageClasses] = React.useState(styles.copieMessage)

    const handleonClick = () => {
        copy(JsonToDisplay)
        setCopieMessage("Description copied to clipboard")
        setCopieMessageClasses(prevState => `${prevState} ${styles.copied}`)
    }

    React.useEffect(() => {
        if (prevJson != JsonToDisplay) {
            setCopieMessage("Click to copy the description")
            setCopieMessageClasses(styles.copieMessage)
            setPrevJson(JsonToDisplay)
        }
    }, [prevJson, JsonToDisplay])

    return (
        <div className={styles.outer}>
            <div onClick={() => handleonClick()} className={styles.codeContainer} >
                <pre>{JsonToDisplay}</pre>

            </div>
            <p className={copieMessageClasses}>{copieMessage}</p>
        </div>

    );
}

export default JSONDisplay;