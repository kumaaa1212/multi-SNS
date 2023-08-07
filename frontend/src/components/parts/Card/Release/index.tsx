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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}


export default function ReleaseCard(props: any) {
  const { className } = props
  const dispatch: AppDispatch = useDispatch()
  const { titleText, labels, thumbnailText, displayThumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const { icon } = useSelector((state: RootState) => state.user)
  const [expanded, setExpanded] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [file, setFile] = useState<File | null>(null)

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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={style.thumbnail_img_cover_icon}
              width='90'
              height='90'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='#ffffff'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              onClick={openFileInput}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2' />
              <path d='M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
            </svg>
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
    </div>
  )
}
