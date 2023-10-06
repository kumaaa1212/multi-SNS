import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Paper } from '@mui/material'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/internal/album'
import style from './Profile.module.scss'
import DeleteIcon from '/public/svg/album_more_delete.svg'
import FollowButton from 'components/parts/Button/Follow'

interface Props {
  album: ArticlesType
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  toastFunc: (content: string, isError: boolean) => void
}

export default function Profile(props: Props): JSX.Element {
  const { album, setLoading, toastFunc } = props
  const { userId } = useSelector((state: RootState) => state.user)
  const [moreover, setMoreover] = useState<boolean>(false)

  const handleDelete = async (album: ArticlesType): Promise<void> => {
    setLoading(true)
    await apiClient
      .delete('/post/album/more/delete', {
        params: {
          postId: album.id,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        setMoreover(false)
        setLoading(false)
      })
  }

  return (
    <Paper elevation={3} className={style.profile}>
      <div className={style.header_area}>
        <h2>Profile</h2>
        <div>
          {album?.authorId === userId ? (
            <MoreVertIcon
              onClick={(): void => setMoreover(!moreover)}
              className={style.moreover_btn}
            />
          ) : (
            <FollowButton
              posts={album}
              content='Follow'
              setLoading={setLoading}
              toastFunc={toastFunc}
            />
          )}
          {moreover && (
            <div className={style.moreover_area} onClick={(): Promise<void> => handleDelete(album)}>
              <p>このAlbumを削除する</p>
              <DeleteIcon className={style.delete_icon} />
            </div>
          )}
        </div>
      </div>
      <div className={style.user_info}>
        <Image
          src={album.authorAvatar}
          alt='チームのエンブレム'
          width={50}
          height={50}
          className={style.img}
        />
        <p>{album.authorName}</p>
      </div>
    </Paper>
  )
}
