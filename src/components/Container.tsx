import React from 'react'
interface containerTypes {
  children: React.ReactNode
  className?: string
}
export default function Container({ children, className }: containerTypes) {
  return <div className={`container relative ${className}`}>{children}</div>
}
