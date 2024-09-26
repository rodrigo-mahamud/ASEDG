import { Button } from '@/components/lib/button'
import { IndexHighlightedNew } from '@/components/IndexHighlightedNew'
import Container from '@/components/Container'
import { IconArrowRight } from '@tabler/icons-react'
import AnimatedGridPattern from './lib/animatedGridPattern'
import { cn } from '@/utils/utils'
import BlurFade from './lib/blurFade'

const IndexHero = ({ data }: IndexHeroTypes) => {
  return (
    <header className="min-h-screen flex items-center mb-32">
      <div className="w-full z-10 flex flex-col gap-24">
        <Container className="pt-48 pb-0">
          <div className=" flex flex-col items-center gap-4">
            <BlurFade delay={0.2} inView>
              <h1 className="text-xl md:text-2xl lg:text-6xl text-balance  tracking-tight font-semibold">
                {data.titleIndex}
              </h1>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <h2 className="text-lg text-balance text-foreground leading-9">{data.description}</h2>
            </BlurFade>
            <BlurFade delay={0.4} inView>
              <Button
                variant="expandIcon"
                size="lg"
                iconClass="w-6 h-6"
                Icon={IconArrowRight}
                iconPlacement="right"
                className="text-lg bg-primary hover:bg-primary/90 rounded-full"
              >
                ¿Qué ver?
              </Button>
            </BlurFade>
          </div>
        </Container>
        <IndexHighlightedNew data={data.newsFour} />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(850px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-30%] h-[175%] skew-y-12 -z-20',
          )}
        />
      </div>
    </header>
  )
}
export default IndexHero
