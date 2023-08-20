import { useState } from 'react'
import { TextField } from '@mui/material'
import { supabase } from '@/utils/supabaseClient'
import style from './EditModal.module.scss'
import Image from 'next/image'
import ModalBase from '@/components/parts/Modal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Icongenerate from '@/utils/functions/Avater'
import { v4 as uuid4 } from 'uuid'

interface Props {
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditModal(props: Props) {
  const { openEdit, setOpenEdit } = props

  const { username, bio, icon, userId } = useSelector((state: RootState) => state.user)

  const [file, setFile] = useState<any>(null)
  const [twitterURL, setTwitterURL] = useState<string>('')
  const [teamURL, setTeamURL] = useState<string>('')
  const [editName, setEditName] = useState<string>(username)
  const [editIntro, seteditIntro] = useState<string>(bio)
  const [displayFile, setDisplayFile] = useState<any>(null)

  const openFileInput = () => {
    const fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  function handleFileSelect(e: any) {
    setDisplayFile(URL.createObjectURL(e.target.files![0]))
    setFile(e.target.files![0])
  }

  const handleSubmit = async () => {
    if (file) {
      try {
        const { data: storageData, error: storegeError } = await supabase.storage
          .from('avatars')
          .upload(`${userId}/${uuid4()}`, file)
        if (storegeError) {
          throw storegeError
        } else {
          const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(storageData.path)
          supabase.auth.updateUser({
            data: {
              username: editName,
              bio: editIntro,
              icon: urlData.publicUrl,
              twitterURL,
              teamURL,
            },
          })
        }
      } catch {
        alert('画像のアップロードに失敗しました。')
      }
    } else {
      supabase.auth.updateUser({
        data: { username: editName, bio: editIntro },
      })
    }
    setOpenEdit(!openEdit)
  }

  return (
    <ModalBase open={openEdit} setOpen={setOpenEdit}>
      <div className={style.edit_modal}>
        <div className={style.handle_area}>
          <button onClick={handleSubmit} className={style.save_btn}>
            保存
          </button>
          <button onClick={() => setOpenEdit(false)} className={style.close_btn}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-x'
              width='40'
              height='40'
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
        <div className={style.profle_info}>
          <div className={style.image_area}>
            <Image
              src={displayFile ? displayFile : Icongenerate(icon)}
              alt={''}
              className={style.profile_img}
              width={150}
              height={150}
              priority={false}
            />
            <span className={style.edit_profile} onClick={() => openFileInput()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-camera'
                width='68'
                height='68'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#ffffff'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2' />
                <path d='M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
              </svg>
              <input
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e)}
              />
            </span>
          </div>
          <div className={style.profile_icon}>
            <div className={style.twitter_icon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
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
              <input
                type='text'
                value={twitterURL}
                onChange={(e) => setTwitterURL(e.target.value)}
              />
            </div>
            <div className={style.team_icon}>
              <svg
                className={style.icon_team}
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
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
              <input type='text' value={teamURL} onChange={(e) => setTeamURL(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='input_area'>
          <TextField
            id='outlined-basic'
            label='NAME'
            variant='outlined'
            onChange={(e) => setEditName(e.target.value)}
            value={editName}
          />
          <textarea
            className={style.bio_input}
            value={editIntro}
            onChange={(e) => seteditIntro(e.target.value)}
          />
        </div>
      </div>
    </ModalBase>
  )
}
