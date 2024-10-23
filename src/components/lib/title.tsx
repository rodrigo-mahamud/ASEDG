import React from 'react'
interface titleTypes {
  title: string
  subtitle?: string
}
export default function Title({ title, subtitle }: titleTypes) {
  return (
    <div className="flex flex-col w-4/5 mb-10">
      <h2 className="text-4xl font-semibold tracking-tight mb-4 line-clamp-1">{title}</h2>
      {subtitle && <h3 className="text-pretty text-base line-clamp-2">{subtitle}</h3>}
    </div>
  )
}
