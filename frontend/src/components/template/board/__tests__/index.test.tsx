import { IncomingMessage, ServerResponse } from 'http'
import { ParsedUrlQuery } from 'querystring'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BoardRoomType } from 'types/internal/board'
import { getServerSideProps } from 'pages/board/[team]'

const server = setupServer(
  rest.get('http://localhost:8000/api/board/boardRooms/:team', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ boardRoom: mockData }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('getServerSideProps function', () => {
  it('should fetch the data correctly', async () => {
    const context = {
      params: {
        team: 'exampleTeam',
      },
      req: { cookies: {} } as IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
      res: {} as ServerResponse,
      query: {} as ParsedUrlQuery,
      resolvedUrl: '',
    }

    const result = await getServerSideProps(context)

    expect(result).toEqual({
      props: {
        boardRoom: mockData,
      },
    })
  })
})

const mockData: BoardRoomType = {
  id: '1',
  board: [],
  createdAt: '2023-09-29T12:00:00Z',
  roomId: 'exampleRoomId',
  team: 'exampleTeam',
}
