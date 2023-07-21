import Image from 'next/image'
import React, { useContext } from 'react'
import styles from './Prolife.module.scss'
import { AuthContext } from '@/context/auth'
const ProfileList = () => {
  const auth = useContext(AuthContext)
  return (
    <div className={styles.detail_profile}>
      <Image
        width={200}
        height={200}
        alt=''
        src={auth.username ? auth?.icon : '/testImg1.jpg'}
        className={styles.img}
        priority={false}
      />
      <ul>
        <li className={styles.list}>
          <p>NAME</p>
          <p>{auth.username}</p>
        </li>
        <li className={styles.list}>
          <p>TEAM</p>
          <p>{auth.team}</p>
        </li>
        <li className={styles.list}>
          <p>FOLLOW</p>
          <p>10</p>
          <p>FOllOWER</p>
          <p>10</p>
        </li>
      </ul>
    </div>
  )
}

export default ProfileList
