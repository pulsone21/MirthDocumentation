import * as React from 'react';
import Nav from "./Nav"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import IconButton from './BasicComponents/Button/IconButton';
import Image from "next/image"
import MD2 from "../public/MD2.png"
import { defaultCss } from "../styles/defaultcss";
import { useLogOutMutation } from 'GraphQl/generated/graphgql';
import styles from "../styles/Module/Components/header.module.css"
import btnStyles from "../styles/Module/Components/button.module.css"
interface HeaderSectionProps {

}

const HeaderSection: React.FC<HeaderSectionProps> = () => {

    const [, logout] = useLogOutMutation()

    const handleClickProfile = () => {
        console.log("directing to profile Page")
    }
    return (
        <header className={styles.headerContainer} >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "10px" }}>
                <h1 className="HeaderTitle">Mirth Documentation</h1>
                <div className="MDlogo">
                    <Image alt="Mirth Documentation Logo" src={MD2} width={70} height={70}></Image>
                </div>
            </div>

            <Nav />
            <div style={{ marginRight: "15px" }}>
                <p className="SideInfo">Mirth Documentation Stand....TBD Function not Impletemented YET</p>
                <div style={{ display: 'flex', flexDirection: "row", marginTop: "10px", justifyContent: "flex-end" }}>
                    <IconButton onClick={handleClickProfile} className={btnStyles.baseBtn}>
                        <FaUser size="1.5em" color={defaultCss.colorTertiary} stroke="#1b578c" style={{ margin: "1px" }} />
                    </IconButton>
                    <IconButton onClick={() => { logout() }} className={btnStyles.baseBtn}>
                        <FaSignOutAlt size="1.5em" color={defaultCss.colorTertiary} stroke="#1b578c" />
                    </IconButton>
                </div>
            </div>
        </header>);
}

export default HeaderSection;

