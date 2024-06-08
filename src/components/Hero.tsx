import React, { FC } from 'react'
import { AuroraBackground } from './lib/auroraBackground'
import Container from './Container'
import { BreadcrumbDemo } from './BreadcrumbDemo'

const Hero = ({ data }) => {
  return (
    <header className="h-[30rem]">
      <AuroraBackground className="h-[inherit]">
        <Container>
          <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-5xl font-cal mb-4">{data.title}</h1>
            <BreadcrumbDemo></BreadcrumbDemo>
          </div>
        </Container>
      </AuroraBackground>
    </header>
  )
}

export default Hero
