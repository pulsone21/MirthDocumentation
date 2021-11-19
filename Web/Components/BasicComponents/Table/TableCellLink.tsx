import React, { TdHTMLAttributes } from 'react'

type TableCellLinkProps = TdHTMLAttributes<HTMLTableCellElement> & {
    link: string
    innerHtml: string
}

const TableCellLink: React.FC<TableCellLinkProps> = ({ link, innerHtml, ...props }) => {
    return (
        <td {...props}><a href={link}>{innerHtml}</a></td>
    );
}
export default TableCellLink;