import React from 'react'
import './styles.css'
import Header from '../Header'
import Footer from '../Footer'
import {AuthProvider} from '../../lib/AuthContext'

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <div className='font-sans bg-white flex flex-col min-h-screen w-full'>
        <div>   
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </AuthProvider>
  )
}

export default Layout