import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from '../../App'
import event from '../fixtures/event.json'

const { REACT_APP_API_URL } = process.env

const { venue, name: eventName } = event.data[0]

const server = setupServer(
  rest.get(REACT_APP_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(event))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays events', async () => {
  render(<App />)

  // on venue search
  const searchInput = screen.getByPlaceholderText(/Find an event/i)
  fireEvent.change(searchInput, { target: { value: venue } })
  const eventItems = await waitFor(() => screen.findAllByTestId('eventItem'))
  expect(eventItems[0]).toHaveTextContent(eventName)

  // on load more
  const loadMoreBtn = screen.getByRole('button', { name: /Load more/i })
  fireEvent.click(loadMoreBtn)
  const elementsWithEventName = await waitFor(() => screen.findAllByText(eventName))
  expect(elementsWithEventName).toHaveLength(2)
})

test('handles server error', async () => {
  server.use(
    rest.get(REACT_APP_API_URL, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<App />)

  const searchInput = screen.getByPlaceholderText(/Find an event/i)
  fireEvent.change(searchInput, { target: { value: venue } })
  expect(await screen.findByText('Internal Server Error')).toBeInTheDocument()
})
