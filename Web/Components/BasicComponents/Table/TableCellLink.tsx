import React, { TdHTMLAttributes } from 'react'

type TableCellLinkProps = TdHTMLAttributes<HTMLTableCellElement> & {
    link: string
    innerHtml: string
    index: number
}

const TableCellLink: React.FC<TableCellLinkProps> = ({ index, link, innerHtml, ...props }) => {
    return (
        <td key={`${index}-${innerHtml}`} {...props}><a href={link}>{innerHtml}</a></td>
    );
}
export default TableCellLink;