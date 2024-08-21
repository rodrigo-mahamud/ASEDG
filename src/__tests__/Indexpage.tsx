import { render, screen } from '@testing-library/react'
import HomePage from '@/app/(frontend)/page'

jest.mock('@payloadcms/next/utilities', () => ({
  getPayloadHMR: jest.fn(() => ({
    findGlobal: jest.fn(() => ({ homePage: { id: '123' } })),
    findByID: jest.fn(() => ({ header: { style: 'inicio' }, body: { layout: [] } })),
  })),
}))

jest.mock('@/components/IndexHero', () => {
  return function DummyIndexHero() {
    return <div>San</div>
  }
})

jest.mock('@/components/RenderBlocks', () => {
  return function DummyRenderBlocks() {
    return <div>RenderBlocks</div>
  }
})

it('renders home page', async () => {
  const HomePageComponent = await HomePage()
  render(HomePageComponent)
  expect(screen.getByText('San')).toBeInTheDocument()
})
