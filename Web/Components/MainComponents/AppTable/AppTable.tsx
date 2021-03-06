
import React from 'react'
import TabelRow from '../../BasicComponents/Table/TabelRow';
import TableCellImage from '../../BasicComponents/Table/TableCellImage';
import TableCellLink from '../../BasicComponents/Table/TableCellLink';
import styles from "../../../styles/Module/Components/mainComponents/applicationTable.module.css"
import TableCellText from 'Components/BasicComponents/Table/TableCellText';
interface AppTableProps {
    bodyElements: string[][]
}

const AppTable: React.FC<AppTableProps> = ({ bodyElements }) => {

    const headerElements = ["Image", "Application Name", "Vendor Name", "AppTree"]
    const tableRows: any[] = [];

    bodyElements.map((row, index) => {
        let cells: any[] = []
        if (row[0] === "") {//LOGO
            cells.push(<TableCellText key={`${index}-${row[0]}`} index={index} innerHtml="No Logo URL found!" />)
        } else {
            cells.push(<TableCellImage key={`${index}-${row[0]}`} index={index} imageLink={row[0]} altText="Application Logo" />)
        }
        cells.push(<TableCellLink key={`${index}-${row[1]}`} index={index} href={`/Application/Application`} as={`/Application/${row[1]}`} innerHtml={row[1]} />)//APPName
        cells.push(<TableCellLink key={`${index}-${row[2]}`} index={index} href={`/Application/${row[1]}`} innerHtml={row[2]} />)//VendorName
        cells.push(<TableCellLink key={`${index}-${row[3]}`} index={index} href={row[3]} innerHtml="AppTree Link" />)//Tree Link
        tableRows.push(<TabelRow key={index} index={index}>{cells}</TabelRow>)
    });

    return (
        <table className={styles.applicationTable}>
            <thead className={styles.thead}>
                <tr>
                    {headerElements.map((el, index) => <th key={index}>{el}</th>)}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {tableRows}
            </tbody>
        </table>
    );
}
export default AppTable;


