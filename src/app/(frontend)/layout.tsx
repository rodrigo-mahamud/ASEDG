import '@/app/(frontend)/styles/globals.css'
import NavBar from '@/components/NavBar'
import SmoothScrolling from '@/components/SmoothScrolling'
import Footer from '@/components/Footer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import localFont from 'next/font/local'

const SequelSans = localFont({
  src: [
    {
      path: '../fonts/GeistVF.woff2',
    },
  ],
  variable: '--font-SequelSans',
})
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayloadHMR({ config: configPromise })
  const header = (await payload.findGlobal({ slug: 'header' })) as any
  return (
    <html lang="es" className={`${SequelSans.variable}`}>
      <body className="overflow-x-hidden useTw bg-[#f8f8f8]">
        <SmoothScrolling>
          <NavBar data={header} />
          {children}
          <Footer></Footer>
        </SmoothScrolling>
      </body>
    </html>
  )
}
