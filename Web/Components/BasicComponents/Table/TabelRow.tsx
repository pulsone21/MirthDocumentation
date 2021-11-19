import React, { HTMLAttributes } from 'react'

type TabelRowProps = HTMLAttributes<HTMLTableRowElement> & {
    index: number
}

const TabelRow: React.FC<TabelRowProps> = ({ children, index }) => {
    return (
        <tr key={`Row-${index}`} id={`Row-${index}`}>{children}</tr>
    );
}
export default TabelRow;