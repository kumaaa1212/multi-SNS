import { GetServerSidePropsContext } from 'next'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { ArticlesType } from 'types/internal/album'
import { getServerSideProps } from 'pages/album'

const server = setupServer(
  rest.get('/article/all/content/order/like', (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json({ articleTopLike: mockData }))
  }),
  rest.get('/article/all/content/order/new', (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json({ articleTopNew: mockData }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockData: ArticlesType[] = [
  {
    authorAvatar: 'avatar1',
    authorId: 'author1',
    authorName: 'Author 1',
    content: 'Article content 1',
    createdAt: '2023-10-09',
    id: 1,
    labels: [],
    thumbnailImg: 'thumbnail1',
    thumbnailText: 'Thumbnail 1',
    title: 'Article 1',
    likes: [],
    bookmarks: [],
  },
]

describe('getServerSideProps function', () => {
  it('should fetch the data correctly', async () => {
    const context: GetServerSidePropsContext = {} as GetServerSidePropsContext

    jest
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce({ status: HttpStatusCode.Ok, data: { articleTopLike: mockData } })
    jest
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce({ status: HttpStatusCode.Ok, data: { articleTopNew: mockData } })

    const result = await getServerSideProps(context)

    expect(result).toEqual({
      props: {
        articlesLike: mockData,
        articlesNew: mockData,
      },
    })
  })

  it('should handle API errors', async () => {
    const context: GetServerSidePropsContext = {} as GetServerSidePropsContext

    jest.spyOn(apiClient, 'get').mockRejectedValueOnce(new Error('API error'))
    jest
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce({ status: HttpStatusCode.Ok, data: { articleTopNew: mockData } })

    await expect(getServerSideProps(context)).rejects.toThrowError('API error')
  })
})
