import { useState } from 'react'
import { Global } from '@emotion/react'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import ButtonBase from 'components/parts/Button/Base'
import stlye from './Drawer.module.scss'

const drawerBleeding = 56

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

interface Props {
  window?: () => Window
  children: React.ReactNode
}

export default function SwipeableEdgeDrawer(props: Props): JSX.Element {
  const { window, children } = props
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const container = window !== undefined ? (): HTMLElement => window().document.body : undefined

  return (
    <Root className={stlye.contents}>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }} className='pt_30 bg_blue'>
        <ButtonBase
          className='ml_30 mb_30'
          onClick={toggleDrawer(true)}
          content='チャットを開く'
          weight='weight_600'
          size='lg'
          blue
        />
        <Divider />
      </Box>
      <SwipeableDrawer
        className={stlye.down}
        container={container}
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Puller />
          <div>{children}</div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}
