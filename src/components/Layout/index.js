import React from 'react'
import './styles.css'
import Header from '../Header'
import Footer from '../Footer'
import {AuthProvider} from '../../lib/AuthContext'

const Layout = ({ children, app=false }) => {
  return (
    <AuthProvider>
      <div className='font-sans bg-white flex flex-col min-h-screen w-full'>
        <div>   
          <Header app={app}/>
          {children}
          <Footer />
        </div>
      </div>
    </AuthProvider>
  )
}

export default Layout