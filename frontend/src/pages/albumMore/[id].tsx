import React from 'react'
import { GetServerSideProps } from 'next'
import AlbumMore from 'components/template/AlbumMore'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/internal/album'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const res = await apiClient.get(`/post/album/${params?.id}`)
    const album = await res.data.post
    return {
      props: {
        album,
      },
    }
  } catch {
    return {
      props: {
        album: null,
      },
    }
  }
}

interface Props {
  album: ArticlesType
}

export default function AlbumDetails(props: Props): JSX.Element {
  const { album } = props

  return <AlbumMore album={album} />
}
