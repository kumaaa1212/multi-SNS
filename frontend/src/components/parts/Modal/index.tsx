import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

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
  children: React.ReactNode
  onClose: (open: boolean) => void
}

export default function ModalBase(props: Props): JSX.Element {
  const { open, children, onClose } = props

  return (
    <Modal open={open || false} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}
