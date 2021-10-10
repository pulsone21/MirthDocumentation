import * as React from 'react';


interface JSONDisplayProps {

}

const JSONDisplay: React.FC<JSONDisplayProps> = () => {
    return (
        <div className="codeContainer">
            <pre>hier kommt dit JSON</pre>
        </div>
    );
}

export default JSONDisplay;