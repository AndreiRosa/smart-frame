import React, {useState, useEffect} from 'react'
import firebase from '../../../lib/firebase'
import {useAuth} from '../../../lib/AuthContext'
import {Link} from 'gatsby'

const Scene = ({scene}) => {
  return(
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://source.unsplash.com/random/384x234" alt="Sunset in the mountains"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <Link className='hover:underline' to={'app/scene/'+scene.id} >
            {scene.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

const Scenes = () => {
  const auth = useAuth()
  const [sceneName, setSceneName] = useState('')
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
      name: sceneName
    })
  }

  const onChange = event => {
    setSceneName(event.target.value)
  }

  return(
    <div>
      <h1>Scenes</h1>
      <div className="mx-auto max-w-lg mb-12">
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Name your scene</span>
          <input value={sceneName} name="sceneName" onChange={onChange} placeholder="" type="text" className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
          <button type='button' onClick={createScene} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
            Create Scene
          </button>
          </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {
          scenes.map(scene => <Scene key={scene.id} scene={scene} />)
        }
      </div>
    </div>
  )
}

export default Scenes