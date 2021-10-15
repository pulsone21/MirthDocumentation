import HomePage from '../Components/MainComponents/Home/Home'
import type { NextPage } from 'next'
import React from 'react'
import HeaderSection from '../Components/HeaderSection'
import Head from 'next/head'




const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mirth Documentation 2.0</title>
        <link rel="shortcut icon" href="/MD2.png" />
      </Head>
      <HeaderSection></HeaderSection>
      <HomePage></HomePage>
    </div>
  )
}

export default Home
