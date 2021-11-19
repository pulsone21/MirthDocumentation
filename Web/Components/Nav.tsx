import React from "react";
import Link from 'next/link'

function Nav() {
  return (
    <div>
      <ul style={{ display: "flex", justifyContent: "space-between" }}>
        <li><Link href="/" passHref><a className="navBtn">Home</a></Link></li>
        <li><Link href="/ApplicationTable"><a className="navBtn">Application Table</a></Link></li>
        <li><Link href="/ChannelnameBuilder"><a className="navBtn">Application Tree</a></Link></li>
        <li><Link href="/ConnectorTable"><a className="navBtn">Connector Table</a></Link></li>
        <li><Link href="/ConnectionView"><a className="navBtn">Connection View</a></Link></li>
        <li><Link href="/DescriptionBuilder"><a className="navBtn">Description Builder</a></Link></li>
        <li><Link href="/ChannelnameBuilder"><a className="navBtn">Channelname Builder</a></Link></li>
      </ul>
    </div>
  );
}

export default Nav;
