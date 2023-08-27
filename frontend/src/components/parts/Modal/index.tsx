import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import styles from './Modal.module.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 10,
  p: 3,
}

interface Props {
  open?: boolean
  setOpen?: any
  children?: React.ReactNode
}


export default function ModalBase(props:Props) {
  const { open, setOpen, children } = props
  
  return (
    <div className={styles.tweet_modal}>
      <Modal
         open={open || false} 
        onClose={() => setOpen(!open)}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  )
}
