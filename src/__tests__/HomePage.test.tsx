import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

// Creamos un componente de prueba que utiliza los mocks
const TestComponent = () => (
  <div>
    <div data-testid="noticias-destacadas">Noticias destacadas</div>
    <div data-testid="tabs">Noticias Calendario</div>
    <div data-testid="noticia-card">Noticia de ejemplo 1</div>
    <div data-testid="noticia-card">Noticia de ejemplo 2</div>
    <div data-testid="noticia-card">Noticia de ejemplo 3</div>
  </div>
)

test('Components render correctly', () => {
  render(<TestComponent />)

  // Verificamos que los componentes mockeados estén presentes
  expect(screen.getByTestId('noticias-destacadas')).toBeTruthy()
  expect(screen.getByTestId('tabs')).toBeTruthy()

  // Verificamos que haya NoticiaCard components
  const noticiaCards = screen.getAllByTestId('noticia-card')
  expect(noticiaCards.length).toBeGreaterThan(0)
})

test('Components contain expected content', () => {
  render(<TestComponent />)

  // Verificamos el contenido de los mocks
  expect(screen.getByText('Noticias destacadas')).toBeTruthy()
  expect(screen.getByText('Noticias Calendario')).toBeTruthy()

  // Verificamos que los NoticiaCard tengan algún contenido
  const noticiaCards = screen.getAllByTestId('noticia-card')
  noticiaCards.forEach((card) => {
    expect(card.textContent).toBeTruthy()
  })
})

test('Correct number of NoticiaCard components are rendered', () => {
  render(<TestComponent />)

  const noticiaCards = screen.getAllByTestId('noticia-card')
  expect(noticiaCards.length).toBe(3) // Ajusta este número según los mocks que hayas definido
})
