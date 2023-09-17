import { useSelector } from 'react-redux'
import Image from 'next/image'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'
import { Chip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { RootState } from 'store/store'
import style from '../Card.module.scss'

export default function ReleaseCard(props: any): JSX.Element {
  const { className } = props

  const { titleText, labels, thumbnailText, displayThumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const { icon } = useSelector((state: RootState) => state.user)

  const formatDate = (date: any): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  return (
    <div className='release_card'>
      <Card sx={{ width: Number(className) }}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe'>
              <Image src={icon} alt={''} width={40} height={40} />
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={titleText}
          subheader={formatDate(new Date())}
        />
        <div className={style.img_area}>
          <Image
            src={displayThumbnailImg}
            alt={''}
            className={style.thumbnail_img}
            width={300}
            height={200}
          />
        </div>
        <CardContent>
          <span>{thumbnailText}</span>
          <div className={style.labels}>
            {labels.map((label: any) => (
              <Chip label={label.name} key={label.label} />
            ))}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}
