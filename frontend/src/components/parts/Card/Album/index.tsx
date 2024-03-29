import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { useToast } from 'components/hooks/useToast'
import { RootState } from 'store/store'
import Icongenerate from 'utils/functions/Avater'
import { formatTimestamp } from 'utils/functions/Time'
import { ArticlesType, LabelType } from 'types/internal/album'
import BookMarkBtn from 'components/parts/Button/BookMark'
import FollowButton from 'components/parts/Button/Follow'
import AlbumLikeBtn from 'components/parts/Button/Like/Album'
import DeleteIcon from '/public/svg/tweet_delete.svg'
import ToastBase from 'components/parts/Toast'
import style from './ArticlesCard.module.scss'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

interface Props {
  album: ArticlesType
  handleDelete: (album: ArticlesType) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlbumCard(props: Props): JSX.Element {
  const { album, handleDelete, setLoading } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [moreover, setMoreover] = useState<boolean>(false)
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [countLikes, setCountLikes] = useState<number>(album?.likes?.length)
  const [countBookmarks, setCountBookmarks] = useState<number>(album?.bookmarks?.length)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  return (
    <div className='articleCard'>
      <Card className={style.article_card}>
        <CardHeader
          className={style.card_header}
          avatar={
            <Image
              src={album?.authorAvatar ? Icongenerate(album.authorAvatar) : '/noavatar.png'}
              alt={''}
              width={30}
              height={30}
              className={style.icon_img}
            />
          }
          action={
            album?.authorId === userId ? (
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
            )
          }
          title={album?.title}
          subheader={formatTimestamp(album?.createdAt)}
        />
        {moreover && (
          <div className={style.moreover_area} onClick={(): void => handleDelete(album)}>
            <p>削除</p>
            <DeleteIcon />
          </div>
        )}
        <div className={style.img_area}>
          <Image
            src={album?.thumbnailImg ? album.thumbnailImg : '/thumbnail.png'}
            alt={''}
            priority
            className={style.main_img}
            width={550}
            height={250}
          />
        </div>
        <CardContent>
          <span className={style.thumbnail_text}>{album?.thumbnailText}</span>
          <div className={style.label_area}>
            {album?.labels.map((label: LabelType) => (
              <Chip label={label.name} key={label.label} className={style.label} />
            ))}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <AlbumLikeBtn
              album={album}
              setCountLikes={setCountLikes}
              toastFunc={toastFunc}
              setLoading={setLoading}
            />
            <span>{countLikes}</span>
          </IconButton>
          <IconButton aria-label='share'>
            <BookMarkBtn
              album={album}
              setCountBookmarks={setCountBookmarks}
              toastFunc={toastFunc}
              setLoading={setLoading}
            />
            <span>{countBookmarks}</span>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <div>
              <Link href={`/albumMore/${album?.id}`}>Show more</Link>
            </div>
          </CardContent>
        </Collapse>
      </Card>
      <ToastBase isError={isError} active={isToast} content={toastContent} />
    </div>
  )
}
