import { vi } from 'vitest'
import React from 'react'

vi.mock('@/components/NoticiasDestacadas', () => ({
  NoticiasDestacadas: () => <div data-testid="noticias-destacadas">Noticias destacadas</div>,
}))

vi.mock('@/components/NoticiaCard', () => ({
  NoticiaCard: ({ titulo }: { titulo: string }) => <div data-testid="noticia-card">{titulo}</div>,
}))

vi.mock('@/components/Tabs', () => ({
  Tabs: () => <div data-testid="tabs">Noticias Calendario</div>,
}))
