import React, { PropsWithChildren, TdHTMLAttributes } from 'react'
import Link, { LinkProps } from 'next/link'


type TableCellLinkProps = TdHTMLAttributes<HTMLTableCellElement> & PropsWithChildren<LinkProps> & {
    innerHtml: string
    index: number
}

const TableCellLink: React.FC<TableCellLinkProps> = ({ index, href, as, innerHtml, ...props }) => {
    return (
        <td key={`${index}-${innerHtml}`} className="ArticalText" {...props}><Link href={href} as={as} passHref><a className="clickable">{innerHtml}</a></Link></td>
    );
}
export default TableCellLink;