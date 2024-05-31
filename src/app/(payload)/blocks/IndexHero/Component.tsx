import Image from 'next/image'
import React, { FC } from 'react'
import { Button } from '@/components/lib/button'
import Link from 'next/link'
// import { DotBackgroundDemo } from '@/components/lib/dotBackground'
import NewsCard from '@/components/Card'
import { Zenitho } from 'uvcanvas'
import { LinkButton } from '@/components/lib/linkButton'
import { Type } from '.'
import { MotionDiv } from '@/components/MotionDiv'
import { IndexHeroNews } from '@/components/IndexHeroNews'
import IndexHighlightedNew from '@/components/IndexHighlightedNew'

const IndexHero: React.FC<Type> = ({
  pretitle,
  title,
  description,
  newsSelection,
  buttons,
}: any) => {
  return (
    <header className="h-screen flex items-center">
      <div className="absolute w-full z-10">
        <div className="container relative">
          <div className="w-full flex gap-16 items-start">
            <div className="w-1/2">
              <MotionDiv
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{
                  ease: [0.14, 1, 0.34, 1],
                  duration: 1.75,
                }}
                className="uppercase text-primary font-semibold"
              >
                {pretitle}
              </MotionDiv>
              <MotionDiv
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{
                  ease: [0.14, 1, 0.34, 1],
                  duration: 1.75,
                  delay: 0.05,
                }}
              >
                <h1 className="text-2xl mt-8 md:text-3xl lg:text-7xl font-cal text-balance pr-10 lg:leading-[72px] tracking-wide">
                  {title}
                </h1>
              </MotionDiv>

              <MotionDiv
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{
                  ease: [0.14, 1, 0.34, 1],
                  duration: 1.75,
                  delay: 0.1,
                }}
              >
                <h2 className="text-xl mt-8 mb-10 text-balance text-foreground leading-9">
                  {description}
                </h2>
              </MotionDiv>
              <MotionDiv
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{
                  ease: [0.14, 1, 0.34, 1],
                  duration: 1.75,
                  delay: 0.15,
                }}
                className="flex gap-5"
              >
                <Button
                  variant="main"
                  arrow
                  className="text-lg px-10 py-8 rounded-full stroke-[1.5] flex gap-1"
                >
                  ¿Qué ver?
                </Button>
                <Button
                  variant="outline"
                  arrow
                  className="text-lg px-10 py-8 rounded-full stroke-[1.5] flex gap-1"
                >
                  Explorar
                </Button>
              </MotionDiv>
            </div>
            <MotionDiv
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{
                ease: [0.14, 1, 0.34, 1],
                duration: 1.75,
                delay: 0.15,
              }}
              className="w-1/2 flex gap-5 justify-center"
            >
              <IndexHeroNews>
                {newsSelection.map((newsItem: any) => (
                  <IndexHighlightedNew key={newsItem.id} {...newsItem} buttonVariant="secondary" />
                ))}
              </IndexHeroNews>
            </MotionDiv>
          </div>
        </div>
      </div>
      {/* <DotBackgroundDemo></DotBackgroundDemo> */}
      <MotionDiv
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
        transition={{
          ease: [0.14, 1, 0.34, 1],
          duration: 1.75,
          delay: 0.2,
        }}
        className=" flex items-end h-full"
      >
        <div className="h-[21vh] skew-y-[350deg] -translate-y-[8rem] overflow-hidden -z-10">
          <Zenitho></Zenitho>
        </div>
      </MotionDiv>
    </header>
  )
}
export default IndexHero
