import React from 'react'
import { ReactNodeType } from '../../types/ReactNodeType'

const RightAligned = ({children}:ReactNodeType) => {
  return (
    <>
      <div style={{display:"flex", justifyContent:"flex-end"}}>
        {children}
      </div>
    </>
  )
}

export default RightAligned