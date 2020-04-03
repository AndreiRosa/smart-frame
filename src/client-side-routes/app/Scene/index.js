import React, {useState, useEffect} from 'react'
import {useAuth} from '../../../lib/AuthContext'
import firebase from '../../../lib/firebase'

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
  [FRAME_TYPES.chromakey.key] : ({id}) => <h1>Adde chroma key {id}</h1>,
  [FRAME_TYPES.chromakey.image]: ({id}) => <h1>Add image {id}</h1>,
  [FRAME_TYPES.chromakey.counter]: ({id}  ) => <h1>Add counter {id}</h1>
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
  }, [db, auth])

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

  return(
    <div>
      <h1>{scene.name}</h1>
      <div className='grid grid-cols-4 gap-4'>
        {Object.keys(FRAME_TYPES).map( key => {
            return(
                <div key={key} onClick={createFrame(key)} className='text-center p-4 bg-white hover:bg-gray-100 h-32 w-32 shadow-md rounded flex items-end'>
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
            return <p><CurrentComp  id={frame.id}/></p>
          })
        }
      </div>
    </div>
  )
}

export default Scene