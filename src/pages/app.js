import React, {useContext} from 'react'
import {Router} from '@reach/router'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'
import {useAuth, AuthProvider} from '../lib/AuthContext'



const CreateScene = () => {
  const auth = useAuth()
  return(
    <div>
      <h1>Create Scene</h1>
    </div>
  )
}

const Scenes = () => {
  return(
    <h1>Scenes</h1>
  )
}

const ShowEmailNotification = () => {
  const auth = useAuth()
  const resendEmailVerification = async () => {
    try{
      await auth.resendEmailVerification()
    } catch(err) {

    }
  }
  if(!auth.emailVerified){
    return (
      <div className='bg-orange-200 p-4'>
        <p className='container mx-auto text-center'>
          Please, confirm your e-mail address ({auth.email}). <br />
          <button onClick={resendEmailVerification}>Click here to re-send e-mail confirmation.</button> 
        </p>
      </div>
    )
  } 
  return null
}

const App = () => {
  return(
      <Layout>
        <ShowEmailNotification />
        <h1>App</h1>
        <Router basepath='/app'>
          <CreateScene path='/create-scene' />
          <Scenes path='/scenes' />
        </Router>
     </Layout>
  )
}

export default App