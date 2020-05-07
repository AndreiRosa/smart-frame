import React from 'react'
import marker from './marker.png'

const ChormaKeyView = ({frame}) => {
  return (
    <div>
      Chroma Key View {frame.id}
      <img src={marker} alt="marker for chroma key"/>
    </div>
  )
}

export default ChormaKeyView