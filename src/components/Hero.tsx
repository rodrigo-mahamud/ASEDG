import React, { FC } from 'react'
import dayjs from 'dayjs'
import { AuroraBackground } from './lib/auroraBackground'
import Container from './Container'
import { BreadcrumbDemo } from './BreadcrumbDemo'

interface HeroTypes {
  publishedDate?: string
  data: {
    title: any
    displaydate?: boolean
  }
}

const Hero: FC<HeroTypes> = ({ data, publishedDate }) => {
  dayjs.locale('es')
  const formattedDate = dayjs(publishedDate).format('DD MMM YYYY')

  return (
    <header className="h-[35rem] bg-secondary">
      <AuroraBackground className="h-[inherit]">
        <Container>
          <div className="flex flex-col w-full items-center justify-center">
            {data.displaydate && (
              <span className=" text-muted-foreground text-sm">
                Actualizado el: {formattedDate}
              </span>
            )}
            <h1 className="text-5xl font-bold tracking-tight my-5">{data.title}</h1>
            <BreadcrumbDemo />
          </div>
        </Container>
      </AuroraBackground>
    </header>
  )
}

export default Hero
