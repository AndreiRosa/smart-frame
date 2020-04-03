import React from 'react'
import {Link, navigateTo} from 'gatsby'
import {useAuth} from '../../lib/AuthContext'
import './styles.css'

const MyAccount = ({signOut}) => {
  return(
    <div className="dropdown inline-block relative">
      <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span>Options</span>
      </button>
      <ul className="dropdown-content absolute hidden text-gray-700 pt-1">
        <li>
          <Link to='/app' className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">
            Home
          </Link>
        </li>
        <li>
          <Link to='/app/update-password' className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            Change passoword
          </Link>
        </li>
        <li>
          <button className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={signOut}>
            Sign out
          </button>
        </li>
      </ul>
  </div>
  )
}

const Header = ({app}) =>{
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
          <Link to='/' className='inline-block py-2 text-gray-800 text-2xl font-bold'>
            SmartFrame-i
          </Link>
        </div>

        <div>
          <div className='hidden md:block'>
            <Link
              to='/d'
              className='inline-block py-1 md:py-4 text-gray-600 mr-6 font-bold'>
                How it Works
              </Link>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>
                Solutions
              </Link>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>
                Pricing
              </Link>
            <Link
              to='#'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>
                Desktop
              </Link>
          </div>
        </div>

        <div className='md:block'>
          {!auth.isAuth &&<React.Fragment>
            <Link
              to='/sign-in'
              className='inline-block py-1 md:py-4 text-gray-500 hover:text-gray-600 mr-6'>Login</Link>
            <Link
              to='/create-account'
              className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'>
                Create Account
              </Link>
          </React.Fragment> }

          {!app && auth.isAuth &&<React.Fragment>
            <Link
              to='/app'
              className='inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg'>
                Go to App
              </Link>
          </React.Fragment> }
          {auth && <MyAccount signOut={signOut}/>}
        </div>
      </div>
    </div>
  )
}

export default Header