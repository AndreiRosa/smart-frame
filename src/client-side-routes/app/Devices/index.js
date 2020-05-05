import React, {useState, useEffect} from 'react'
import firebase from '../../../lib/firebase'
import {useAuth} from '../../../lib/AuthContext'

const Devices = () => {
  const auth = useAuth()
  const [deviceId, setDeviceId] = useState('')
  const [devices, setDevices] = useState([])
  const [scenes, setScenes] = useState([])
  const [deviceStatus, setDeviceStatus] = useState('')
  const db = firebase.firestore()

  useEffect(() => {
    if (auth.isAuthReady){
      db
        .collection('devices')
        .doc(auth.uid)
        .collection('devices')
        .onSnapshot(querySnapshot => {
          const docs = []
          querySnapshot.forEach((doc) => {
            docs.push({
              ...doc.data(),
              id: doc.id
            })
        })
        setDevices(docs)
      })

      db
        .collection('scenes')
        .doc(auth.uid)
        .collection('scenes')
        .onSnapshot(querySnapshot => {
          const docs = []
          querySnapshot.forEach((doc) => {
            docs.push({
              ...doc.data(),
              id: doc.id
            })
        })
        setScenes(docs)
      })
    }
  }, [db, auth])
  
  const activateDevice = async () => {
    const docRef = db
      .collection('temp-devices')
      .doc(deviceId)
    const doc = await docRef.get()
    const deviceData = doc.data() 
    if(deviceData){
      setDeviceStatus('VALID')
      docRef.update({
        owner: auth.uid
      })
    } 
    else setDeviceStatus('INVALID') 
  }

  const onChange = event => {
    setDeviceId(event.target.value)
  }

  const setSceneOnDevice = deviceId => {
    const [select] = document.getElementsByName('device'+deviceId)

    db
      .collection('devices')
      .doc(auth.uid)
      .collection('devices')
      .doc(deviceId)
      .update({
        scene: select.value
      })
  }

  return(
    <div>
      <h1>Devices</h1>
      <div className="mx-auto max-w-lg mb-12">
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Device ID</span>
          <input value={deviceId} name="deviceId" onChange={onChange} placeholder="" type="text" className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
        <button type='button' onClick={activateDevice} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
          Activate Device
        </button>
        {deviceStatus}
        <h3>Devices:</h3>
        {device.map(device => {
          return(
            <div>
              <h4>Friendly name for Device</h4>
              <select name={'device-'+device.id}>
                {scenes.map(scene => <option key={scene.id} value={scene.id}>{scene.name}</option>)}
              </select>
              <button onClick={() => setSceneOnDevice(device.id)}>Define Scene</button>
            </div>
          )
        })}
       </div>
      </div>
    </div>
  )
}

export default Devices