import React from 'react'

export default function page({ params }: any) {
  return <div>{params.slug}</div>
}
