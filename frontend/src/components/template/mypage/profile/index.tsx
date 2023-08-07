import { Button, Paper } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import bg_img from 'public/bg_img.jpg'
import profile_img from 'public/profile_img.jpg'
import styles from './Prolife.module.scss'
import EditModal from '@/components/wigets/Modal/Edit'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Noavater from '/public/noavater.jpg'

const Profile = () => {

  const [open, setOpen] = useState<boolean>(false)

  const { username, icon, bio, follow, follower } = useSelector((state: RootState) => state.user)
  
  return (
    <Paper elevation={2} className={styles.container}>
      {open && <EditModal open={open} setOpen={setOpen} />}
      <div className={styles.image_area}>
        <Image src={bg_img} alt={''} className={styles.bg_img} />
        <Image
          src={username ? icon : Noavater}
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
          <span>{username}</span>
        </div>
        <div className={styles.detail_team}>
          {/* <span>{auth.team}</span> */}
          <span>FC東京</span>
        </div>
        <div className={styles.detail_bio}>
          <span>{bio}</span>
        </div>
        <div className={styles.detail_number}>
          <span>{follow.length}Following</span>
          <span>{follower.length}Followers</span>
          <span>6 games watched</span>
          <span>7 Rank</span>
        </div>
      </div>
    </Paper>
  )
}

export default Profile
