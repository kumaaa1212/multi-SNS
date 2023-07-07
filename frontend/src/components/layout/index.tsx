import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'

const Layout = ({children}:{children:React.ReactNode}) => {
  const route = useRouter()
  const Sidebarhandle = () =>{
      if(route.asPath === '/'){
        return (<Sidebar/> )
      }
  }
  return (
    <div className='layout'>
    <Header/>
    <main>
      <Sidebarhandle/>
    {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout