import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='layout'>
      <Header />
      <main className='main_area'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
