import * as React from 'react';
import Nav from "./Nav"
import Registerform from './MainComponents/Forms/RegistertForm/Registerform';
import { FaSignInAlt, FaUserPlus, FaUserSecret } from "react-icons/fa"
import Popup from './MainComponents/Forms/Popup';
import { useState } from 'react';
import Loginform from './MainComponents/Forms/LoginForm/LoginForm';
import IconButton from './BasicComponents/Button/IconButton';
import Head from "next/head"

interface HeaderSectionProps {

}

const HeaderSection: React.FC<HeaderSectionProps> = () => {

    const [logInForm, SetLogInForm] = useState(false)
    const [registerForm, SetRegisterForm] = useState(false)

    return (
        <header>
            <h1 className="titles">Mirth Documentation</h1>
            <Nav />
            <div style={{ marginRight: "15px" }}>
                <p className="SideInfo">Mirth Documentation Stand....TBD Function not Impletemented YET</p>
                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                    <FaUserSecret size="2em" color="#222d38" stroke="#1b578c" />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton className="baseBtn" onClick={() => SetLogInForm(true)}>
                            <FaSignInAlt style={{ marginRight: "15px", alignSelf: "center" }} />
                            <p>Login</p>
                        </IconButton>
                        <IconButton className="baseBtn" onClick={() => SetRegisterForm(true)}>
                            <FaUserPlus style={{ marginRight: "15px", alignSelf: "center" }} />
                            <p>Register</p>
                        </IconButton>
                    </div>
                    <Popup trigger={registerForm} setTrigger={SetRegisterForm}>
                        <Registerform></Registerform>
                    </Popup>
                    <Popup trigger={logInForm} setTrigger={SetLogInForm}>
                        <Loginform></Loginform>
                    </Popup>
                </div>
            </div>
        </header>);
}

export default HeaderSection;

