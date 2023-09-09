import { render } from '@testing-library/react'
import Board from 'components/template/bulletinboard'
import apiClient from 'libs/apiClient'
import { setupServer } from 'msw/node'
// const server = setupServer(
//  await apiClient.get(`/board/boardRooms/YokohamaFC`)
// )
describe('Example', () => {
  it('表示されること', () => {
    const dummyData = {
      board: [
        {
          id: '1',
          content: 'サンプルコンポーネント',
          authorId: '1',
          authorName: 'smaple name',
          authorAvatar: 'sample.jpg',
          likes: [],
          messages: [],
          createdAt: '2021-08-22T13:00:00.000Z',
          roomId: '1',
        },
      ],
      createdAt: '2021-08-22T13:00:00.000Z',
      roomId: '1',
      team: 'smaple team',
      id: '1',
    }
    render(<Board boardRoom={dummyData} />)
  })
})
