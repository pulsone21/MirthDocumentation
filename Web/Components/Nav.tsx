import React from "react";
import Link from 'next/link'
import Button from "./BasicComponents/Button/BasicButton";

function Nav() {
  return (
    <div>
      <ul style={{ display: "flex", justifyContent: "space-between" }}>
        <li><Link href="/" passHref><a className="navBtn">Home</a></Link></li>
        <li><Link href="/ApplicationTable"><a className="navBtn">ApplicationTable</a></Link></li>
        <li><Link href="/ConnectorTable"><a className="navBtn">ConnectorTable</a></Link></li>
        <li><Link href="/ConnectionView"><a className="navBtn">ConnectionView</a></Link></li>
        <li><Link href="/DescriptionBuilder"><a className="navBtn">DescriptionBuilder</a></Link></li>
        <li><Link href="/ChannelnameBuilder"><a className="navBtn">ChannelNameBuilder</a></Link></li>
      </ul>
    </div>
  );
}

export default Nav;
