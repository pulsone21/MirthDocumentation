import React from 'react'
import BasicButton, { BasicButtonProps } from '../Button/BasicButton';

type TableCellButtonProps = BasicButtonProps & {
    innerHtml: string
    index: number
}

const TableCellButton: React.FC<TableCellButtonProps> = ({ index, innerHtml, onClick }) => {
    return (
        <td key={`${index}-${innerHtml}`}><BasicButton title={innerHtml} onClick={onClick} /></td>
    );
}
export default TableCellButton;