import { GetServerSidePropsContext } from 'next'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { TweetsType } from 'types/internal/tweet'
import { getServerSideProps } from 'pages/tweet'

const server = setupServer(
  rest.get('/article/all/tweets/order/like', (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json({ tweetsLike: mockData.tweetsLike }))
  }),
  rest.get('/article/all/tweets/order/new', (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json({ tweetsNew: mockData.tweetsNew }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockData: { tweetsLike: TweetsType[]; tweetsNew: TweetsType[] } = {
  tweetsLike: [
    {
      id: 1,
      authorAvatar: 'avatar1',
      authorId: 'author1',
      authorName: 'Author 1',
      content: 'Tweet content 1',
      createdAt: '2023-10-09',
      img: 'image1',
      likes: [],
      label: 'Label 1',
    },
  ],
  tweetsNew: [
    {
      id: 2,
      authorAvatar: 'avatar2',
      authorId: 'author2',
      authorName: 'Author 2',
      content: 'Tweet content 2',
      createdAt: '2023-10-10',
      img: 'image2',
      likes: [],
      label: 'Label 2',
    },
  ],
}

describe('getServerSideProps function', () => {
  it('should handle API errors', async () => {
    const context: GetServerSidePropsContext = {} as GetServerSidePropsContext

    jest.spyOn(apiClient, 'get').mockRejectedValueOnce(new Error('API error'))

    await expect(getServerSideProps(context)).rejects.toThrowError('API error')
  })
})
