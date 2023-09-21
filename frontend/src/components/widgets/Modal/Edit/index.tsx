import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { TextField } from '@mui/material'
import { updateUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch, RootState } from 'store/store'
import { v4 as uuid4 } from 'uuid'
import { supabase } from 'utils/supabaseClient'
import Button from 'components/parts/Button/Base'
import ModalBase from 'components/parts/Modal'
import CloseIcon from '/public/svg/modal_close.svg'
import ImgIcon from '/public/svg/modal_img.svg'
import TwetterIcon from '/public/svg/modal_twitter.svg'
import TeamIcon from '/public/svg/modal_team.svg'
import style from './EditModal.module.scss'

interface Props {
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditModal(props: Props): JSX.Element {
  const { openEdit, setOpenEdit } = props

  const dispatch: AppDispatch = useDispatch()
  const { username, bio, icon, userId, twitterURL, teamURL } = useSelector(
    (state: RootState) => state.user,
  )

  const [file, setFile] = useState<File | string>()
  const [twitterURLData, setTwitterURLData] = useState<string | undefined>(twitterURL)
  const [teamURLData, setTeamURLData] = useState<string | undefined>(teamURL)
  const [editName, setEditName] = useState<string>(username)
  const [editIntro, seteditIntro] = useState<string>(bio)
  const [displayFile, setDisplayFile] = useState<string>()

  const openFileInput = (): void => {
    const fileInput = document.getElementById('fileInput')
    fileInput?.click()
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files![0]

    if (selectedFile) {
      setDisplayFile(URL.createObjectURL(selectedFile))
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (): Promise<void> => {
    if (file) {
      try {
        const { data: storageData, error: storegeError } = await supabase.storage
          .from('avatars')
          .upload(`${uuid4()}/${uuid4()}`, file)
        if (storegeError) {
          throw storegeError
        } else {
          const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(storageData.path)
          const res = await apiClient.put(`/auth/update/${userId}`, {
            name: editName,
            bio: editIntro,
            icon: urlData.publicUrl,
            twitterURL: twitterURLData,
            teamURL: teamURLData,
          })
          dispatch(updateUser(res.data))
        }
      } catch {
        alert('画像のアップロードに失敗しました。')
      }
    } else {
      const res = await apiClient.put(`/auth/update/${userId}`, {
        name: editName,
        bio: editIntro,
        twitterURL: twitterURLData,
        teamURL: teamURLData,
      })
      dispatch(updateUser(res.data))
    }
    setOpenEdit(!openEdit)
  }

  return (
    <ModalBase open={openEdit} onClose={setOpenEdit}>
      <div className={style.edit_modal}>
        <div className={style.handle_area}>
          <Button
            content='保存'
            onClick={handleSubmit}
            className='mr_30'
            size='md'
            weight='weight_600'
            black
          />
          <CloseIcon onClick={(): void => setOpenEdit(false)} className={style.close_btn} />
        </div>
        <div className={style.profle_info}>
          <div className={style.image_area}>
            <Image
              src={displayFile ? displayFile : icon}
              alt={''}
              className={style.profile_img}
              width={150}
              height={150}
              priority={false}
            />
            <div className={style.edit_profile}>
              <ImgIcon onClick={openFileInput} />
              <input
                type='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </div>
          </div>
          <div className={style.profile_icon}>
            <div className={style.twitter_icon}>
              <TwetterIcon />
              <input
                type='text'
                value={twitterURLData}
                onChange={(e): void => {
                  setTwitterURLData(e.target.value)
                }}
              />
            </div>
            <div className={style.team_icon}>
              <TeamIcon className={style.icon_team} />
              <input
                type='text'
                value={teamURLData}
                onChange={(e): void => {
                  setTeamURLData(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className='input_area'>
          <TextField
            id='outlined-basic'
            label='NAME'
            variant='outlined'
            onChange={(e): void => {
              setEditName(e.target.value)
            }}
            value={editName}
          />
          <textarea
            className={style.bio_input}
            value={editIntro}
            onChange={(e): void => {
              seteditIntro(e.target.value)
            }}
          />
        </div>
      </div>
    </ModalBase>
  )
}
