import React, {useState, useEffect} from 'react'
import firebase from '../../../lib/firebase'
import {useAuth} from '../../../lib/AuthContext'

const Devices = () => {
  const auth = useAuth()
  const [deviceID, setDeviceId] = useState('')
  const [scenes, setScenes] = useState([])
  const db = firebase.firestore()

  useEffect(() => {
    if (auth.isAuthReady){
      db
        .collection('scenes')
        .doc(auth.udi)
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
  
  const createScene = () => {
    const newSceneRef = db
      .collection('scenes')
      .doc(auth.uid)
      .collection('scenes')
      .doc()
    newSceneRef.set({
      name: deviceID
    })
  }

  const onChange = event => {
    setDeviceId(event.target.value)
  }

  return(
    <div>
      <h1>Devices</h1>
      <div className="mx-auto max-w-lg mb-12">
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Device ID</span>
          <input value={deviceID} name="sceneName" onChange={onChange} placeholder="" type="text" className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
        <button type='button' onClick={createScene} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
          Activate Device
        </button>
       </div>
      </div>
    </div>
  )
}

export default Devices