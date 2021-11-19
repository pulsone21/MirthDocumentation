import React from 'react'
import BasicButton from '../Button/BasicButton';

interface TableCellButtonProps {
    innerHtml: string
}

const TableCellButton: React.FC<TableCellButtonProps> = ({ innerHtml }) => {
    return (
        <td><BasicButton title={innerHtml} /></td>
    );
}
export default TableCellButton;