import React, {useState} from 'react'
import firebase from '../../../../../lib/firebase'

const ChromaKey = ({id, uid, sceneId, frame}) => {
  const db = firebase.firestore()

  const COLORS = [
    {value:'green', label:'Green'},
    {value:'blue', label:'Blue'},
    {value:'red', label:'Red'},
  ]

  const [settings, setSttings] = useState({
    color: 'green',
    showMarkers: false 
  })

  const onChange= (event) => {
    const name = event.target.name
    const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    setSttings(oldSettings => {
      return {
        ...oldSettings,
        [name]: value
      }
    })
  }

  const save = () => {
      const newSceneRef = db
      .collection('frames')
      .doc(uid)
      .collection(sceneId)
      .doc(id)
      frame.update({
        settings
      })
 
  }

  return(
    <div className='border-solid m-8 border-gray-200 m-8 p-8'>
      <h1 className='font-bold'>Chroma Key</h1>
      <select onChange={onChange} onBlur={onChange} name='color' value={settings.color}>
        {
          COLORS.map(color => <option key={color.value} value={color.value}>{color.label}</option>)
        }
      </select>
      <label>
        <input type='checkbox' onChange={onChange} checked={settings.showMarkers} name='showMarkers' value={true}/> Show tracking markers
      </label>
      <button onClick={save}>Save</button>
    </div>
  )
}

export default ChromaKey