import * as React from 'react';


interface JSONDisplayProps {
    JsonToDisplay: string
}

const JSONDisplay: React.FC<JSONDisplayProps> = ({ JsonToDisplay }) => {

    return (
        <div className="codeContainer">
            <pre>{JsonToDisplay}</pre>
        </div>
    );
}

export default JSONDisplay;