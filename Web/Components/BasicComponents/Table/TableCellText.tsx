import React, { TdHTMLAttributes } from 'react'

type TableCellTextProps = TdHTMLAttributes<HTMLTableCellElement> & {
    innerHtml: string
}

const TableCellText: React.FC<TableCellTextProps> = ({ innerHtml, ...props }) => {
    return (
        <td {...props} >{innerHtml}</td>
    );
}
export default TableCellText;