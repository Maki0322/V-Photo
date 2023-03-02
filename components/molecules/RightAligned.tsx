import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

const RightAligned = ({children}:Props) => {
  return (
    <>
      <div style={{display:"flex", justifyContent:"flex-end"}}>
        {children}
      </div>
    </>
  )
}

export default RightAligned