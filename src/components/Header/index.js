import React from 'react'
import {Link, navigateTo} from 'gatsby'
import {useAuth} from '../../lib/AuthContext'

const Header = () =>{
  const auth = useAuth()
  const signOut = async() => {
    await auth.signOut()
    navigateTo('/')
  }

  return(
    <div className='bg-gray-200 px-4 py-4'>
      <div
        className='w-full md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between'>
        <div>
          <Link to='/' className='inline-block py-2 text-gray-800 text-2xl font-bold'>SmartFrame-i</Link>
        </div>

        <div>
          <div className='hidden md:block'>
            <Link
              to='/d'
              className='inline-block py-1 md:py-4 text-gray-600 mr-6 font-bold'>How it Works</Link>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>Solutions</Link>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>Pricing</Link>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>Desktop</Link>
          </div>
        </div>

        <div className='md:block'>
          {!auth.isAuth &&<React.Fragment>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>Login</Link>
            <Link
              to='/create-account'
              className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'>Create Account</Link>
          </React.Fragment> }

          {auth.isAuth &&<React.Fragment>
            <Link
              to='/app'
              className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'>Go to App</Link>
              <button onClick={signOut}>Sign out</button>
          </React.Fragment> }
        </div>
      </div>
    </div>
  )
}

export default Header