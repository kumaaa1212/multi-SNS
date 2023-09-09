import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import styles from './Modal.module.scss'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 10,
  p: 3,
}

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const ModalBase = (props: Props): JSX.Element => {
  const { open, setOpen, children } = props

  return (
    <div className={styles.tweet_modal}>
      <Modal
        open={open || false}
        onClose={(): void => {
          setOpen(!open)
        }}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}

export default ModalBase
