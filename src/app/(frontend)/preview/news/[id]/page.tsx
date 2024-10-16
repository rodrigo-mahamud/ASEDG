import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Toaster } from 'sonner'
import { notFound } from 'next/navigation'
import NewsHeader from '@/components/news/news-page/NewsHeader'
import Container from '@/components/Container'
import RichTextParser from '@/utils/richTextParser'
import NewsStickyAside from '@/components/news/news-page/NewsStickyAside'
import { NewsItemFull } from '@/types/types'
import NewsRelated from '@/components/news/news-page/NewsRelated'

export default async function PreviewPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadHMR({ config })

  const page = (await payload.findByID({
    collection: 'news',
    id: params.id,
    draft: true,
  })) as any

  if (!page) {
    return notFound()
  }

  const hasAsides = (page: NewsItemFull) => {
    const hasAttachments = page.attachments?.length > 0
    const hasH2Tags =
      page.richtxtcontent?.root?.children?.some((child) => child.tag === 'h2') || false
    return hasAttachments || hasH2Tags
  }
  const shouldShowAside = hasAsides(page)

  return (
    <>
      <NewsHeader data={page} />
      <main>
        <Container className="flex gap-20">
          <article className={`${shouldShowAside ? 'w-[70%]' : 'w-[70%] mx-auto'}`}>
            <RichTextParser content={page.richtxtcontent}></RichTextParser>
          </article>
          {shouldShowAside ? (
            <aside className="w-[30%]">
              <NewsStickyAside attachments={page.attachments} indexContent={page.richtxtcontent} />
            </aside>
          ) : (
            ''
          )}
        </Container>
        {page.newsRelated ? <NewsRelated newsRelated={page.newsRelated} /> : ''}
      </main>
      <Toaster />
    </>
  )
}
