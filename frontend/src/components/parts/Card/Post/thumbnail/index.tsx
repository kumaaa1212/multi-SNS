import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import { Chip } from '@mui/material'
import style from '../Card.module.scss'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addThumbnailImg, dispalyThumbnailImg } from '@/features/postSlice'
import CameraIcon from '/public/svg/post_thubnail_img_camera.svg'

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

export default function ThumbnailCard(props: any) {
  const { className } = props
  const dispatch: AppDispatch = useDispatch()
  const { titleText, labels, thumbnailText, displayThumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const [expanded, setExpanded] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [file, setFile] = useState<File | null>(null)
  const { icon } = useSelector((state: RootState) => state.user)

  const formatDate = (date: any) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  const openFileInput = () => {
    const fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  const handleImg = (e: any) => {
    dispatch(addThumbnailImg(e.target.files[0]))
    dispatch(dispalyThumbnailImg(e.target.files[0]))
  }

  return (
    <Card sx={{ maxWidth: Number(className) }}>
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
        subheader={formatDate(currentDate)}
      />
      <div className={style.img_area}>
        <Image
          src={displayThumbnailImg}
          alt={''}
          className={style.thumbnail_img}
          width={300}
          height={200}
        />
        <div className={style.thumbnail_img_cover}>
          <CameraIcon onClick={openFileInput} className={style.thumbnail_img_cover_icon} />
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => handleImg(e)}
          />
        </div>
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
      <Collapse in={expanded} timeout='auto' unmountOnExit></Collapse>
    </Card>
  )
}
