import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'

const db = firebase.firestore()

const D = () => {
  const [isReady, setIsReady] = useState(false)
  const [activated, setActivated] = useState(false)
  const [number, setNumber] = useState(0)
  const [device, setDevice] = useState({})
  const [currentDevice, setCurrentDevice] = useState({})

  useEffect(() => {
    if(!localStorage.getItem('deviceNumber')){
      const random = Math.floor(Math.random()*999999).toString().padStart(6, '0')
      localStorage.setItem('deviceNumber', random)
      setNumber(random)
    } else setNumber(localStorage.getItem('deviceNumber'))
  }, [])

  useEffect(() => {
    const alreadyActivated = !!localStorage.getItem('deviceNumber') && !!localStorage.getItem('owner')
    
    if (alreadyActivated) setActivated(alreadyActivated)
  }, [])
  
  useEffect(() => {
    if(!activated && number > 0){
      db 
      .collection('temp-devices')
      .doc(number)
      .set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setIsReady(true)
      })
    }
    
  }, [activated, number])

  useEffect(() => {
    let unsubscribe = null
    if(isReady && !activated)
      unsubscribe = db 
        .collection('temp-devices')
        .doc(number)
        .onSnapshot(snap => {
          const deviceData = snap.data()
          if(deviceData) setDevice(deviceData)
        })
    return () => {
      if(unsubscribe) unsubscribe()
    }
  }, [isReady, activated, number])

  useEffect(() => {
    if(device && device.owner){
      db
        .collection('devices')
        .doc(device.owner)
        .collection('devices')
        .doc(number)
        .set({
          ...device,
          activated: true
        })
        .then(() => {
          localStorage.setItem('owner', device.owner)
          setActivated(true)
          db
            .collection('devices')
            .doc(device.owner)
            .delete()
            .then(() => {
              
            })
        })
    }
  }, [device, number])

  useEffect(() => {
    let unsubscribe = null
    if (activated){
      unsubscribe = db 
        .collection('devices')
        .doc(localStorage.getItem('owner'))
        .collection('devices')
        .doc(localStorage.getItem('deviceNumber'))
        .onSnapshot(snap => {
          setCurrentDevice(snap.data())
        }) 
    }
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [device, activated])

  return(
    <Layout>
      <h1>Página Inicial</h1>
      {!activated && <h2>{number}</h2>}
      {!activated && <h2>Device already activated!</h2>}
    </Layout>
  )
}

export default D