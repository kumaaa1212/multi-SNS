import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import bg_img from 'public/bg_img.jpg'
import Link from 'next/link'
import { Chip } from '@mui/material'
import style from '../Card.module.scss'
import { AuthInfo } from '@/context/auth'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}
interface Props {
  thumbnailText: string
  className: string
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
  const { className, thumbnailText,selectedLabel } = props
  const [expanded, setExpanded] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date());
  const auth = AuthInfo()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // 1秒ごとに日付を更新
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }


  return (
    <div className='timeline'>
      <Card sx={{ width: Number(className) }}>
      <CardHeader
          avatar={
            <Avatar  aria-label='recipe'>
             <Image src={auth.icon} alt={''} width={40} height={40} />
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title='ここにタイトルが表示されます'
          subheader={formatDate(currentDate)}
        />
        <Image src={bg_img} alt={''} className='timeline_img' />
        <CardContent>
        <span>{thumbnailText}</span>
        <div className={style.labels}>{selectedLabel.map((label:any) => (
          <Chip label={label.name} />
        ))}</div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
        </Collapse>
      </Card>
    </div>
  )
}
