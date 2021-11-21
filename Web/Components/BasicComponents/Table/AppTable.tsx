import ApplicationForm, { appInitValues } from 'Components/MainComponents/Forms/ChannelNameComponentForms/ApplicationForm';
import VendorForm, { VendorInitialValues } from 'Components/MainComponents/Forms/ChannelNameComponentForms/VendorForm';
import Popup from 'Components/MainComponents/Forms/Popup';
import { useGetApplicationByLongNameQuery, useGetVendorByLongNameQuery } from 'GraphQl/generated/graphgql';
import React, { useCallback, useEffect, useState } from 'react'
import TabelRow from './TabelRow';
import TableCellButton from './TableCellButton';
import TableCellImage from './TableCellImage';
import TableCellLink from './TableCellLink';
import TableCellText from './TableCellText';

interface AppTableProps {
    bodyElements: string[][]
}

const AppTable: React.FC<AppTableProps> = ({ bodyElements }) => {
    const [popUpState, setPopUpState] = useState(false)
    const [hiddenPopUpState, setHiddenPopUpState] = useState(false)
    const [vendLongName, setVendLongName] = useState("")
    const [appLongName, setAppLongName] = useState("")
    const [appFormInitValues, SetAppFormInitValues] = useState<appInitValues>()
    const [vendFormInitValues, SetVendFormInitValues] = useState<VendorInitialValues>()
    const [{ data: vendData }] = useGetVendorByLongNameQuery({ variables: { longName: vendLongName }, })
    const [{ data: appData }] = useGetApplicationByLongNameQuery({ variables: { longName: appLongName } })


    const headerElements = ["Image", "Application Name", "Vendor Name", "AppTree", "Edit"]
    const tableRows: any[] = [];

    //TODO find a way to update the default input of the PopUp
    //?Maybe its easy to just route to a page and construct everything new....

    const handleCallback = useCallback(() => {
        //TODO Find a way to update the logo
        if (appData?.GetApplicationByLongName.Application && vendData?.GetVendorByLongName.Vendor) {
            SetAppFormInitValues({
                vendor: vendData.GetVendorByLongName.Vendor?.longName,
                longName: appData.GetApplicationByLongName.Application.longName,
                shortName: appData.GetApplicationByLongName.Application.shortName,
                logo: undefined
            })
            SetVendFormInitValues({
                longName: vendData.GetVendorByLongName.Vendor.longName,
                shortName: vendData.GetVendorByLongName.Vendor.shortName,
                application: appData.GetApplicationByLongName.Application?.longName
            })
        }
        setPopUpState(hiddenPopUpState);
    }, [appFormInitValues, vendFormInitValues, hiddenPopUpState])

    useEffect(() => {
        console.log("rerender")
        if (hiddenPopUpState) handleCallback()
    }, [hiddenPopUpState, handleCallback])


    const handleEditToogle = (rowIndex: number) => {
        setAppLongName(bodyElements[rowIndex][1])
        setVendLongName(bodyElements[rowIndex][2])
        setHiddenPopUpState(true)
    }



    bodyElements.map((row, index) => {
        let cells: any[] = []
        cells.push(<TableCellImage index={index} imageLink={row[0]} altText="Application Logo" />)//LOGO
        cells.push(<TableCellText index={index} className="articalText" innerHtml={row[1]} />)//APPName
        cells.push(<TableCellText index={index} className="articalText" innerHtml={row[2]} />)//VendorName
        cells.push(<TableCellLink index={index} className="articalText" link={row[3]} innerHtml="AppTree Link" />)//Tree Link
        cells.push(<TableCellButton index={index} onClick={() => handleEditToogle(index)} innerHtml={row[4]} />)//Edit Button
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
            <Popup trigger={popUpState} setTrigger={() => { setHiddenPopUpState(false); setPopUpState(false) }}>
                <div>
                    <ApplicationForm vendorList={[]} initialValues={appFormInitValues} />
                    <VendorForm initialValues={vendFormInitValues} />
                </div>
            </Popup>
        </>
    );
}
export default AppTable;


