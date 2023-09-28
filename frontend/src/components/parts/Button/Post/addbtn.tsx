import { useState } from 'react'
import { useRouter } from 'next/router'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import style from './PostBtn.module.scss'

const actions = [
  { icon: <PostAddIcon />, name: 'Tweet', href: 'Tweet' },
  { icon: <PhotoLibraryIcon />, name: 'Album', href: 'Album' },
]

interface Props {
  setOpen: (open: boolean) => void
}

export default function PostBtn(props: Props): JSX.Element {
  const { setOpen } = props

  const router = useRouter()
  const [addBtn, setaddBtn] = useState(false)
  const handleOpen = (): void => setaddBtn(true)
  const handleClose = (): void => setaddBtn(false)
  const handleAdd = (key: string): void => {
    if (key === 'Album') {
      router.push('/post')
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
              onClick={(): void => handleAdd(action.href)}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  )
}
