import { useState } from 'react'
import { TextField } from '@mui/material'
import { supabase } from '@/utils/supabaseClient'
import style from './EditModal.module.scss'
import Image from 'next/image'
import bg_img from 'public/bg_img.jpg'
import profile_img from 'public/profile_img.jpg'
import ModalBase from '@/components/parts/Modal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditModal(props: Props) {
  const { open, setOpen } = props
  const { username, bio, icon } = useSelector((state: RootState) => state.user)
  const [file, setFile] = useState<any>(null)
  const [editName, setEditName] = useState<string>(username)
  const [editIntro, seteditIntro] = useState<string>(bio)
  const [editIcon, seteditIcon] = useState<string>(icon)

  const openFileInput = () => {
    const fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  // async function handleFileSelect(e: any) {
  //   const selectedFile = e.target.files![0];
  //   await supabase.storage
  //     .from("avatars")
  //     .upload(`avatars/${selectedFile.name}`, selectedFile, {
  //       cacheControl: "3600",
  //       upsert: false,
  //     });
  //   seteditIcon(selectedFile.name);
  // }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    supabase.storage.from('avatars').getPublicUrl(`avatars/${editIcon}`)
    await supabase.auth.updateUser({
      data: { username: editName, bio: editIntro, icon: 'mhnfgbdrvsfeadwserdgfnscd' },
    })
    setOpen(!open)
  }

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className={style.edit_modal}>
        <div className={style.handle_area}>
          <button onClick={handleSubmit} className={style.save_btn}>
            保存
          </button>
          <button onClick={() => setOpen(!open)} className={style.close_btn}>
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
        <div className={style.image_area}>
          <Image src={bg_img} alt={''} className={style.bg_img} width={600} height={250} />
          <span className={style.edit_bgImg}>
            <svg
              onClick={openFileInput}
              xmlns='http://wvscode-file://vscode-app/Users/ryoheiokuma/Downloads/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlww.w3.org/2000/svg'
              className={style.icon}
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={style.icon}
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
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
            <input
              type='file'
              id='bg_fileInput'
              style={{ display: 'none' }}
              // onChange={(e) => handleFileSelect(e)}
            />
          </span>
          <Image
            src={username ? icon : profile_img}
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
              // onChange={(e) => handleFileSelect(e)}
            />
          </span>
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
