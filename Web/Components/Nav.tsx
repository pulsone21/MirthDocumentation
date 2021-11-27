import React from "react";
import Link from 'next/link'
import btnStyles from "../styles/Module/Components/basicComponents/button.module.css"

function Nav() {
  return (
    <div>
      <ul style={{ display: "flex", justifyContent: "space-between" }}>
        <li><Link href="/" passHref><a className={btnStyles.navBtn}>Home</a></Link></li>
        <li><Link href="/ApplicationTable"><a className={btnStyles.navBtn}>Application Table</a></Link></li>
        <li><Link href="/ChannelnameBuilder"><a className={btnStyles.navBtn}>Application Tree</a></Link></li>
        <li><Link href="/ConnectorTable"><a className={btnStyles.navBtn}>Connector Table</a></Link></li>
        <li><Link href="/ConnectionView"><a className={btnStyles.navBtn}>Connection View</a></Link></li>
        <li><Link href="/DescriptionBuilder"><a className={btnStyles.navBtn}>Description Builder</a></Link></li>
        <li><Link href="/ChannelnameBuilder"><a className={btnStyles.navBtn}>Channelname Builder</a></Link></li>
      </ul>
    </div>
  );
}

export default Nav;
