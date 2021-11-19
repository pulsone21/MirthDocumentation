import React from 'react'
import TabelRow from './TabelRow';
import TableCellButton from './TableCellButton';
import TableCellImage from './TableCellImage';
import TableCellLink from './TableCellLink';
import TableCellText from './TableCellText';

interface AppTableProps {
    bodyElements: string[][]
}

const AppTable: React.FC<AppTableProps> = ({ bodyElements }) => {
    const headerElements = ["Image", "Application Name", "Vendor Name", "AppTree", "Edit"]
    const tableRows: any[] = [];

    bodyElements.map((row, index) => {
        let cells: any[] = []
        cells.push(<TableCellImage imageLink={row[0]} altText="Application Logo" />)//LOGO
        cells.push(<TableCellText className="articalText" innerHtml={row[1]} />)//APPName
        cells.push(<TableCellText className="articalText" innerHtml={row[2]} />)//VendorName
        cells.push(<TableCellLink className="articalText" link={row[3]} innerHtml="AppTree Link" />)//Tree Link
        cells.push(<TableCellButton innerHtml={row[4]} />)//Edit Button
        tableRows.push(<TabelRow className="p-10 " index={index}>{cells}</TabelRow>)
    });

    return (
        <table className="w-11/12 text-center content-center">
            <thead>
                <tr>
                    {headerElements.map((el, index) => <th className="SubTitle text-white" key={index}>{el}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
}
export default AppTable;