import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'

const db = firebase.firestore()

const D = () => {
  const random = Math.floor(Math.random()*999999).toString().padStart(6, '0')
  const alreadyActivated = !!localStorage.getItem('deviceNumber') && !!localStorage.getItem('owner')
  const number = localStorage.getItem('deviceNumber') || random
  const [isReady, setIsReady] = useState(false)
  const [activated, setActivated] = useState(alreadyActivated)
  
  useEffect(() => {
    if(!activated){
      db 
      .collection('temp-devices')
      .doc(number)
      .set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        localStorage.setItem('deviceNumber', number)
        setIsReady(true)
      })
    }
    
  }, [activated])

  useEffect(() => {
    let unsubscribe = null
    if(isReady && !activated)
      unsubscribe = db 
        .collection('temp-devices')
        .doc(number)
        .onSnapshot(snap => {
          const deviceData = snap.data()
          if(deviceData && deviceData.owner){
            db
              .collection('devices')
              .doc(deviceData.owner)
              .collection('devices')
              .doc(number)
              .set({
                activated: true
              })
              .then(() => {
                localStorage.setItem('owner', deviceData.owner)
                setActivated(true)
                db
                  .collection('devices')
                  .doc(deviceData.owner)
                  .delete()
                  .then(() => {
                    
                  })
              })
          }
        })
    return () => {
      if(unsubscribe) unsubscribe()
    }
  }, [isReady, activated])

  useEffect(() => {
    let unsubscribe = null
    if (activated){
      unsubscribe = db 
        .collection('devices')
        .doc(localStorage.getItem('owner'))
        .collection('devices')
        .doc(localStorage.getItem('deviceNumber'))
        .onSnapshot(snap => {

        }) 
    }
    return () => {
      if (unsubscribe) unsubscribe()
    }
  })

  return(
    <Layout>
      <h1>Página Inicial</h1>
      {!activated && <h2>{number}</h2>}
      {!activated && <h2>Device already activated!</h2>}
    </Layout>
  )
}

export default D