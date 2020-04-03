import React from 'react'
import {useAuth} from '../../../lib/AuthContext'

const CreateScene = () => {
  const auth = useAuth()
  return(
    <div>
      <h1>Create Scene</h1>
    </div>
  )
}

export default CreateScene