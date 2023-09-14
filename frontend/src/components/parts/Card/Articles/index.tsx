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
import { RootState } from 'store/store'
import Icongenerate from 'utils/functions/Avater'
import { formatTimestamp } from 'utils/functions/Time'
import { ArticlesType, LabelType } from 'types/global'
import BookMarkBtn from 'components/parts/Button/BookMark'
import DeleteButton from 'components/parts/Button/Delete'
import FollowButton from 'components/parts/Button/Follow'
import AlbumLikeBtn from 'components/parts/Button/Like/Album'
import style from './ArticlesCard.module.scss'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface Props {
  album: ArticlesType
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

export default function AlbumCard(props: Props): JSX.Element {
  const { album } = props

  const { username } = useSelector((state: RootState) => state.user)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [moreover, setMoreover] = useState<boolean>(false)
  const [countLikes, setCountLikes] = useState<number>(album?.likes.length)
  const [countBookmarks, setCountBookmarks] = useState<number>(album?.bookmarks.length)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const handleDelete = async (): Promise<void> => {
    try {
      setMoreover(false)
    } catch {
      alert('削除に失敗しました')
    }
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
            album?.authorName === username ? (
              <MoreVertIcon
                onClick={(): void => setMoreover(!moreover)}
                className={style.moreover_btn}
              />
            ) : (
              <FollowButton posts={album} content='Follow' />
            )
          }
          title={album?.title}
          subheader={formatTimestamp(album?.createdAt)}
        />
        <div className={style.moreover_area} onClick={handleDelete}>
          {moreover && (
            <div onClick={handleDelete}>
              <DeleteButton content='削除' album onClick={handleDelete} />
            </div>
          )}
        </div>
        <Image
          src={album?.thumbnailImg ? album.thumbnailImg : '/thumbnail.png'}
          alt={''}
          className={style.main_img}
          width={550}
          height={250}
        />
        <CardContent>
          <span className={style.thumbnail_text}>{album?.thumbnailText}</span>
          <div className={style.label_area}>
            {album?.labels.map((label: LabelType) => <Chip label={label.name} key={label.label} />)}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <AlbumLikeBtn album={album} setCountLikes={setCountLikes} />
            <span>{countLikes}</span>
          </IconButton>
          <IconButton aria-label='share'>
            <BookMarkBtn album={album} setCountBookmarks={setCountBookmarks} />
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
              <Link href={`/home/albumMore/${album?.id}`}>Show more</Link>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
