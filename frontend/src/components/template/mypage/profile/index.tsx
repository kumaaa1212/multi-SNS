import { Button, Paper } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import bg_img from '../../../../../public/bg_img.jpg'
import profile_img from '../../../../../public/profile_img.jpg'
import styles from './Prolife.module.scss'
import { AuthInfo } from '@/context/auth'
import EditModal from '@/components/parts/Modal/editModal'
const Profile = () => {
  const [open, setOpen] = useState<boolean>(false)
  const auth = AuthInfo()
  return (
    <Paper elevation={2} className={styles.container}>
      {open && <EditModal open={open} setOpen={setOpen} />}
      <div className={styles.image_area}>
        <Image src={bg_img} alt={''} className={styles.bg_img} />
        <Image
          src={auth.username ? auth.icon : profile_img}
          alt={''}
          className={styles.profile_img}
          width={140}
          height={140}
          priority={false}
        />
      </div>
      <div className={styles.edit_btnArea}>
        <Button
          variant='contained'
          sx={{
            background: 'black',
            color: 'white',
            ':hover': { background: 'black' },
          }}
          onClick={() => setOpen(!open)}
          className={styles.edit_btn}
        >
          編集
        </Button>
      </div>
      <div className={styles.profile_area}>
        <div className={styles.detail_name}>
          <span>{auth.username}</span>
        </div>
        <div className={styles.detail_team}>
          {/* <span>{auth.team}</span> */}
          <span>FC東京</span>
        </div>
        <div className={styles.detail_bio}>
          <span>{auth.bio}</span>
        </div>
        <div className={styles.detail_number}>
          <span>{auth.follow}Following</span>
          <span>{auth.follower}Followers</span>
          <span>6 games watched</span>
          <span>7 Rank</span>
        </div>
      </div>
    </Paper>
  )
}

export default Profile
