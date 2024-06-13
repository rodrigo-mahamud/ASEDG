import { Button } from '@/components/lib/button'
import { Zenitho } from 'uvcanvas'
import { LinkButton } from '@/components/lib/linkButton'
import { MotionDiv } from '@/components/MotionDiv'
import { IndexHeroNews } from '@/components/IndexHeroNews'
import IndexHighlightedNew from '@/components/IndexHighlightedNew'
import Container from '@/components/Container'
import { IconArrowRight } from '@tabler/icons-react'
interface NewsTypes {
  id: string
  className?: string
  badgeClass?: string
  shareClass?: string
  buttonVariant?: string
  title: string
  summary: string
  image: {
    id: number
    alt: string
    url: string
  }
}
interface IndexHeroTypes {
  data: {
    pretitleIndex: string
    titleIndex: string
    description: string
    newsRelationship: NewsTypes[]
  }
}
const IndexHero = ({ data }: IndexHeroTypes) => {
  return (
    <header className="h-screen flex items-center mb-32">
      <div className="absolute w-full z-10">
        <Container>
          <div className="w-full flex gap-16 items-start">
            <div className="w-1/2">
              <MotionDiv
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{
                  ease: [0.14, 1, 0.34, 1],
                  duration: 1.75,
                }}
                className="text-primary font-semibold tracking-tight"
              >
                {data.pretitleIndex}
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
                  {data.titleIndex}
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
                  {data.description}
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
                  variant="expandIcon"
                  size="lg"
                  Icon={IconArrowRight}
                  iconPlacement="right"
                  className="text-lg bg-primary hover:bg-primary/90 rounded-full"
                >
                  ¿Qué ver?
                </Button>
                <Button variant="linkHover2" size="lg" className="text-lg ">
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
                {data.newsRelationship.map((newsItem) => (
                  <IndexHighlightedNew key={newsItem.id} {...newsItem} buttonVariant="secondary" />
                ))}
              </IndexHeroNews>
            </MotionDiv>
          </div>
        </Container>
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
        <div className="h-[25vh] skew-y-[348deg] -translate-y-[1rem] overflow-hidden -z-10">
          <Zenitho></Zenitho>
        </div>
      </MotionDiv>
    </header>
  )
}
export default IndexHero
