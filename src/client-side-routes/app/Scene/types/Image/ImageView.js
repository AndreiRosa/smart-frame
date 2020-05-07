import React from 'react'

const ImageView = ({frame}) => {
  return (
    <div>
      Image View {frame.id}
      <img src={frame.url} alt="image view"/>
    </div>
  )
}

export default ImageView