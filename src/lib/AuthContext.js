import React, {createContext, useContext, useState, useEffect} from 'react'
import firebase from '../lib/firebase'

export const AuthContext = createContext()

export const AuthProvider =({children}) => {
  const [auth, setAuth] = useState({isAuth: false})
  useEffect(() => {
    firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        setAuth({
          isAuth: true,
          email: user.email,
          name: user.displayName || user.email,
          emailVerified: user.emailVerified,
          uid: user.id
        })
      } else {
        setAuth({
          isAuth: false
        })
      }
    })
  }, [])

  const resendEmailVerification = async () => {
    const user = firebase.auth().currentUser
    await user.sendEmailVerification()
  }
  
  const signOut = async () => {
    await firebase.auth().signOut()
  }

  return(
    <AuthContext.Provider value = {{...auth, resendEmailVerification, signOut}}>
      {children}
    </AuthContext.Provider>
  ) 
}
export const useAuth = () => {
  return useContext(AuthContext) 
}