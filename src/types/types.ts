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
