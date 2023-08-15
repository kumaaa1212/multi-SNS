import Image from 'next/image'
import React, { Dispatch, useEffect, useState } from 'react'
import style from './Prolife.module.scss'
import EditModal from '@/components/wigets/Modal/Edit'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Noavater from '/public/noavater.jpg'
import Icongenerate from '@/utils/functions/Avater'
import PostBtn from '@/components/parts/Button/Post/addbtn'
import apiClient from '@/libs/apiClient'

interface Props {
  setOpen: Dispatch<boolean>
}

const Profile = (props: Props) => {
  const { setOpen } = props
  const { username, icon, bio, follow, follower, userId } = useSelector(
    (state: RootState) => state.user,
  )

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [like, setLike] = useState<any>()

  useEffect(() => {
    const llikeDeta = async () => {
      try{
        const likeArry = await apiClient.get(`/post/album/likes/${userId}`)
        setLike(likeArry.data.likes)
      }
      catch{
        alert('情報の更新に失敗しました。')
      }
    }
    llikeDeta()
  }, [])

  return (
    <div>
      {openEdit && <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} />}
      <div className={style.profile_area}>
        <Image
          src={icon ? Icongenerate(icon) : Noavater}
          alt={''}
          width={200}
          height={200}
          className={style.profile_img}
        />
        <div className={style.profile_details}>
          <div className={style.profile_header}>
            <h1>{username}</h1>
            <button className={style.profile_header_btn} onClick={() => setOpenEdit(true)}>
              編集
            </button>
          </div>
          <div className={style.profile_bio}>{bio}</div>
          <div className={style.profile_info}>
            <button>
              <span>{like ? like.length : 0}Likes</span>
            </button>
            <button>
              <span>{follow.length}Follow</span>
            </button>
            <button>
              <span>{follower.length}Follower</span>
            </button>
          </div>
          <div className={style.other_icon}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
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
              <path
                d='M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z'
                stroke-width='0'
                fill='currentColor'
              />
            </svg>
            <svg
              className={style.icon_team}
              xmlns='http://www.w3.org/2000/svg'
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
              <path d='M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
              <path d='M3 9h3v6h-3z' />
              <path d='M18 9h3v6h-3z' />
              <path d='M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
              <path d='M12 5l0 14' />
            </svg>
          </div>
        </div>
      </div>
      <PostBtn setOpen={setOpen} />
    </div>
  )
}

export default Profile
