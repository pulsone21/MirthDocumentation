import React from 'react'
import TabelRow from './TabelRow';
import TableCellText from './TableCellText';

interface BasicTableProps {
    tableStyling?: string;
    headerElements: string[]
    bodyElements: string[][]
}

const BasicTable: React.FC<BasicTableProps> = (props) => {
    const tableRows: any[] = [];

    props.bodyElements.map((row, index) => {

        let cells: any[] = []
        row.map((cell, index) => {
            cells.push(<TableCellText innerHtml={cell} />)
        })

        tableRows.push(<TabelRow index={index}>{cells}</TabelRow>)
    });

    return (
        <table className={props.tableStyling}>
            <thead>
                <tr>
                    {props.headerElements.map((el, index) => <th key={index}>{el}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table >
    );
}
export default BasicTable;

/*
infos über den header,
<table>
    <thead>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
    </thead>
    <tbody>
        <td>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
        </td>
        <td>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
        </td>
        <td>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
        </td>
        <td>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
        </td>
    </tbody>
</table>

*/