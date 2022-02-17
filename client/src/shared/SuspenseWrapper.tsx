import React from 'react'
import SmallSpinner from './SmallSpinner'

type SuspenseWrapperProps = {
    children: React.ReactNode
}

const SuspenseWrapper = ({children}:SuspenseWrapperProps) => {
  return (
    <React.Suspense fallback={<SmallSpinner/>}>
        {children}
    </React.Suspense>
  )
}

export default SuspenseWrapper