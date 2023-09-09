import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { addThumbnailImg, dispalyThumbnailImg } from 'features/postSlice'
import { AppDispatch, RootState } from 'store/store'
import { LabelType } from 'types/global'
import style from '../Card.module.scss'
import CameraIcon from '/public/svg/post_thubnail_img_camera.svg'

interface Props {
  className?: string
}

export default function ThumbnailCard(props: Props): JSX.Element {
  const { className } = props
  const dispatch: AppDispatch = useDispatch()
  const { titleText, labels, thumbnailText, displayThumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const { icon } = useSelector((state: RootState) => state.user)

  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  const openFileInput = (): void => {
    const fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      dispatch(addThumbnailImg(e.target.files[0]))
      dispatch(dispalyThumbnailImg(e.target.files[0]))
    }
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
        <div className={style.thumbnail_img_cover}>
          <CameraIcon onClick={openFileInput} className={style.thumbnail_img_cover_icon} />
          <input type='file' id='fileInput' style={{ display: 'none' }} onChange={handleImg} />
        </div>
      </div>
      <CardContent>
        <span>{thumbnailText}</span>
        <div className={style.labels}>
          {labels.map((label: LabelType) => (
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
  )
}
