import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import PostAddIcon from '@mui/icons-material/PostAdd'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { useState } from 'react'
import style from './PostBtn.module.scss'
import { useRouter } from 'next/router'

const actions = [
  { icon: <PostAddIcon />, name: 'Tweet', href: 'Tweet' },
  { icon: <PhotoLibraryIcon />, name: 'Album', href: 'Album' },
  { icon: <StackedBarChartIcon />, name: 'Record', href: 'Record' },
]

export default function PostBtn(props: any) {
  const { setOpen } = props
  
  const router = useRouter()
  const [addBtn, setaddBtn] = useState(false)
  const handleOpen = () => setaddBtn(true)
  const handleClose = () => setaddBtn(false)
  const handleAdd = (key: any) => {
    if (key === 'Record') {
      router.push('/post/tweet')
    } else if (key === 'Album') {
      router.push('/post/album')
    } else if (key === 'Tweet') {
      setOpen(true)
    }
  }
  return (
    <div className={style.add_btn}>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel='SpeedDial controlled open example'
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={addBtn}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleAdd(action.href)}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  )
}
