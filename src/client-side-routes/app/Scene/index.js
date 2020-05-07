import React, {useState, useEffect} from 'react'
import {useAuth} from '../../../lib/AuthContext'
import firebase from '../../../lib/firebase'
import ChromaKey from './types/ChromaKey'
import Image from './types/Image'


const FRAME_TYPES = {
  chromakey: {
    key: 'chromakey',
    label: 'Add chroma key'
  },
  image: {
    key: 'image',
    label: 'Add image'
  },
  counter: {
    key: 'counter',
    label: 'Add counter'
  },
}

const FrameComponents = {
  [FRAME_TYPES.chromakey.key] : ({id}) => ChromaKey,
  [FRAME_TYPES.chromakey.image]: ({id}) => Image,
  // [FRAME_TYPES.chromakey.counter]: ({id}  ) => <h1>Component: Counter {id}</h1>
}

const Scene = ({sceneId}) => {
  const auth = useAuth()
  const [scene, setScene] = useState({})
  const [frames, setFrames] = useState([])
  const db = firebase.firestore()

  useEffect(() => {
    if (auth.isAuthReady){
      db 
        .collection('scenes')
        .doc(auth.udi)
        .collection('scenes')
        .doc(sceneId)
        .onSnapshot(querySnapshot => {
         setScene({
            ...querySnapshot.data,
            id: sceneId
         }) 
      })

      db
        .collection('frames')
        .doc(auth.udi)
        .collection(sceneId)
        .onSnapshot(querySnapshot => {
          const currentFrames = []
          querySnapshot.forEach(doc => {
            currentFrames.push({
              ...doc.data(),
              id: doc.id 
            })
          })
          setFrames(currentFrames)
      })
    }
  }, [db, auth, sceneId])

  const createFrame = (type) => () => {
    const newSceneRef = db
      .collection('frames')
      .doc(auth.uid)
      .collection(sceneId)
      .doc()
    newSceneRef.set({
      type
    })
  }

  const onKeyDown = (type) => evt => {
    if (evt.keyCode === 13) createFrame(type)()
  }

  return(
    <div>
      <h1>{scene.name}</h1>
      <div className='grid grid-cols-4 gap-4'>
        {Object.keys(FRAME_TYPES).map( key => {
            return(
                <div role='button' key={key} tabIndex='0' onClick={createFrame(key)} onKeyDown={onKeyDown(key)} className='text-center p-4 bg-white hover:bg-gray-100 h-32 w-32 shadow-md rounded flex items-end'>
                  <p>{FRAME_TYPES[key].label}</p>
                </div>
            )
          }
        )}  
      </div>
      <div>
        {
          frames.map(frame => {
            const CurrentComp = FrameComponents[frame.type]
            return <CurrentComp key={frame.id} id={frame.id} frame={frame} uid={auth.uid} scene={sceneId}/>
          })
        }
      </div>
    </div>
  )
}

export default Scene