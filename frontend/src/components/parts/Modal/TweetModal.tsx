import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styles from './Modal.module.scss'
import Image from 'next/image'
import profile_img from '../../../../public/profile_img.jpg'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: auto,
  height: 220,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
}

export default function TweetModal(props: any) {
  const { open, setOpen } = props
  function openFileInput() {
    const fileInput = document.getElementById('addImg')
    fileInput?.click()
  }

  function handleFileSelect(e: any) {
    const selectedFile = e.target.files![0]
    console.log(selectedFile)
  }

  return (
    <div className={styles.tweet_modal}>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className={styles.handle_area}>
            <button onClick={() => setOpen(!open)} className={styles.close_btn}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-x'
                width='30'
                height='30'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#000000'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className={styles.tweet_header}>
            <Image
              src={profile_img}
              alt={''}
              width={50}
              height={50}
              className={styles.profile_img}
            />
            <textarea
              name=''
              id=''
              placeholder='What is happening'
              className={styles.tweet_content}
            ></textarea>
          </div>
          <div className={styles.handle_tweet}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-photo-minus'
              width='36'
              height='36'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='#000000'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              onClick={() => openFileInput()}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 8h.01' />
              <path d='M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v9' />
              <path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4' />
              <path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2 2' />
              <path d='M16 19h6' />
            </svg>
            <input
              type='file'
              id='addImg'
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e)}
            />
            <button className={styles.handle_btn}>Tweet</button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
