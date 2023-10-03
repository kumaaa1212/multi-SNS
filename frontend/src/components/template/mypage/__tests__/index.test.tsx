import React from 'react'
import { render } from '@testing-library/react'
import apiClient from 'libs/apiClient'
import Profile from '../_container/profile'

jest.mock('libs/apiClient', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}))

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches like count on component mount', async () => {
    const mockedResponse = {
      status: 200,
      data: {
        likes: [],
      },
    }

    jest.mock('libs/apiClient', () => ({
      __esModule: true,
      default: {
        get: jest.fn().mockResolvedValueOnce(mockedResponse),
      },
    }))

    render(<Profile />)
    expect(apiClient.get).toHaveBeenCalledWith(`/post/album/likes/1`)
  })
})
