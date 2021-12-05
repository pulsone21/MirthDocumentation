import React, { TdHTMLAttributes } from 'react'

type TableCellTextProps = TdHTMLAttributes<HTMLTableCellElement> & {
    innerHtml: string
    index: number
}

const TableCellText: React.FC<TableCellTextProps> = ({ index, innerHtml, ...props }) => {
    return (
        <td key={`${index}-${innerHtml}`} className="ArticalText"  {...props} >{innerHtml}</td>
    );
}
export default TableCellText;