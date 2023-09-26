import React from 'react'
import AlbumMore from 'components/template/AlbumMore'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/internal/album'

export const getServerSideProps = async (context: { params: { id: any } }) => {
  try {
    const res = await apiClient.get(`/post/album/${context.params.id}`)
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
