import React, {useEffect, useState} from 'react'
import firebase from '../lib/firebase'
import ChromaKeyView from '../client-side-routes/app/Scene/types/ChromaKey/ChromaKeyView'
import ChromaKeyView from '../client-side-routes/app/Scene/types/Image/ImageView'

const db = firebase.firestore()

const D = () => {
  const [isReady, setIsReady] = useState(false)
  const [activated, setActivated] = useState(false)
  const [number, setNumber] = useState(0)
  const [device, setDevice] = useState({})
  const [currentDevice, setCurrentDevice] = useState({})
  const [frames, setFrames] = useState([])
  const [currentFrame, setCurrentFrame] = useState(0)

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

  useEffect(() => {
    let unsubscribe = null
    if(currentDevice.scene){
      if (activated){
        unsubscribe = db 
          .collection('frames')
          .doc(localStorage.getItem('owner'))
          .collection(currentDevice.scene )
          .doc(currentDevice.scene)
          .onSnapshot(snap => {
            const docs = []
            snap.forEach((doc) => {
              docs.push({
                ...doc.data(),
                id: doc.id
              })
            })
          setFrames(docs)
          })
      } 
    }
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [currentDevice])

  useEffect(() => {
    let timer = null
    if(activated && frames && frames.length > 0){
      timer = setInterval(() => {
        setCurrentFrame(old => (old+1)%frames.length)
      }, 5000)
    }
    return () => {
      if (timer) { 
        clearInterval(timer)
      }
    }
  }, [activated, frames])

  let CurrentView = null
  if(frames && frames[currentFrame] && frames[currentFrame].type === 'chromakey') CurrentView = ChromaKeyView
  if(frames && frames[currentFrame] && frames[currentFrame].type === 'image') CurrentView = ImageView


  return(
    <div>
      <h1>Página Inicial</h1>
      {!activated && <h2>{number}</h2>}
      {activated && frames && CurrentView && <CurrentView frame={frames[currentFrame]}/>}
      {activated && <div className='absolute bottom-0 right-0 bg-gray-800 text-white p-2 text-xs font-bold'>Device ID: {number} </div> }
    </div>
  )
}

export default D