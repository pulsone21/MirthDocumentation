
import React from 'react'
import TabelRow from './TabelRow';
import TableCellImage from './TableCellImage';
import TableCellLink from './TableCellLink';
interface AppTableProps {
    bodyElements: string[][]
}

const AppTable: React.FC<AppTableProps> = ({ bodyElements }) => {

    const headerElements = ["Image", "Application Name", "Vendor Name", "AppTree"]
    const tableRows: any[] = [];

    bodyElements.map((row, index) => {
        let cells: any[] = []
        cells.push(<TableCellImage index={index} imageLink={row[0]} altText="Application Logo" />)//LOGO
        cells.push(<TableCellLink index={index} className="ArticalText" href={`/Application/Application`} as={`/Application/${row[1]}`} innerHtml={row[1]} />)//APPName
        cells.push(<TableCellLink index={index} className="ArticalText" href={`/Application/${row[1]}`} innerHtml={row[2]} />)//VendorName
        cells.push(<TableCellLink index={index} className="ArticalText" href={row[3]} innerHtml="AppTree Link" />)//Tree Link
        tableRows.push(<TabelRow index={index}>{cells}</TabelRow>)
    });

    return (
        <>
            <table className="w-11/12 text-center content-center applicationTable">
                <thead>
                    <tr>
                        {headerElements.map((el, index) => <th className="SubTitle text-white" key={index}>{el}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </>
    );
}
export default AppTable;


