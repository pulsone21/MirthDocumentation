import * as React from 'react';
import Nav from "./Nav"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import IconButton from './BasicComponents/Button/IconButton';
import Image from "next/image"
import MD2 from "../public/MD2.png"
import { defaultCss } from "../styles/defaultcss";
import { useLogOutMutation } from 'GraphQl/generated/graphgql';
interface HeaderSectionProps {

}

const HeaderSection: React.FC<HeaderSectionProps> = () => {

    const [, logout] = useLogOutMutation()

    const handleClickProfile = () => {
        console.log("directing to profile Page")
    }
    return (
        <header>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <h1 className="titles">Mirth Documentation</h1>
                <div className="MDlogo">
                    <Image alt="Mirth Documentation Logo" src={MD2} width={70} height={70}></Image>
                </div>
            </div>

            <Nav />
            <div style={{ marginRight: "15px" }}>
                <p className="SideInfo">Mirth Documentation Stand....TBD Function not Impletemented YET</p>
                <div style={{ display: 'flex', flexDirection: "row", marginTop: "10px", justifyContent: "flex-end" }}>
                    <IconButton onClick={handleClickProfile} className="baseBtn" >
                        <FaUser size="1.5em" color={defaultCss.colorTertiary} stroke="#1b578c" className="m-1 " />
                    </IconButton>
                    <IconButton onClick={() => { logout() }} className="baseBtn">
                        <FaSignOutAlt size="1.5em" color={defaultCss.colorTertiary} stroke="#1b578c" className="" />
                    </IconButton>
                </div>
            </div>
        </header>);
}

export default HeaderSection;

