import React, {useState, useEffect, useRef} from 'react'
import firebase from '../../../lib/firebase'
import {useAuth} from '../../../lib/AuthContext'

const Device = ({device, setSceneOnDevice, scenes}) => {
  const selectRef = useRef()
  
  const setScene = () => {
    setSceneOnDevice(device.id, selectRef.current.value)
  }

  return(
    <div className='p-6 m-2 border rounded'>
      <h4 className="font-bold">Device ID: {device.id}</h4>
      <div className="w-full mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={"select-"+device.id}>
          Scene
        </label>
        <div className="relative">
          <select id={"select-"+device.id} ref={selectRef} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            {scenes.map(scene => <option key={scene.id} value={scene.id}>{scene.name}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <button onClick={setScene} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block hover:text-white hover:bg-black">Define Scene</button>
    </div>
  )
}

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

  const setSceneOnDevice = (deviceId, value) => {
    db
      .collection('devices')
      .doc(auth.uid)
      .collection('devices')
      .doc(deviceId)
      .update({
        scene: value
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
          return <Device key={device.id} device={device} setSceneOnDevice={setSceneOnDevice} scenes={scenes}/>
        })}
       </div>
      </div>
    </div>
  )
}

export default Devices