import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'

const D = () => {
  const [number, setNumber] = useState(Math.floor(Math.random()*999999).toString().padStart(6, '0'))
  useEffect(() => {
    const deviceNumber = localStorage.getItem('deviceNumber')
    if(deviceNumber) {
      setNumber(deviceNumber)
      const db = firebase.firestore()
      db 
        .collection('temp-devices')
        .doc(deviceNumber)
        .set({
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {

        })
    }
    else localStorage.setItem('deviceNumber', number)
  }, [])
  return(
    <Layout>
      <h1>Página Inicial</h1>
      <h2>{number}</h2>
    </Layout>
  )
}

export default D