import { Button } from '@/components/lib/button'
import { Zenitho } from 'uvcanvas'
import { LinkButton } from '@/components/lib/linkButton'
import { MotionDiv } from '@/components/MotionDiv'
import { IndexHeroNews } from '@/components/IndexHeroNews'
import { IndexHighlightedNew } from '@/components/IndexHighlightedNew'
import Container from '@/components/Container'
import { IconArrowRight } from '@tabler/icons-react'
import AnimatedGridPattern from './lib/animatedGridPattern'
import { cn } from '@/utils/utils'
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
    newsFour: NewsTypes[]
  }
}
const IndexHero = ({ data }: IndexHeroTypes) => {
  return (
    <header className="min-h-screen flex items-center mb-32">
      <div className="w-full z-10 flex flex-col gap-20">
        <Container className="pb-0">
          <div className=" flex flex-col items-center gap-4">
            {data.pretitleIndex}

            <h1 className="text-xl md:text-2xl lg:text-6xl text-balance  tracking-tight font-semibold">
              {data.titleIndex}
            </h1>

            <h2 className="text-lg text-balance text-foreground leading-9">{data.description}</h2>

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
          </div>
        </Container>
        <IndexHighlightedNew />
      </div>
    </header>
  )
}
export default IndexHero
