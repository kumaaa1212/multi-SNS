import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import apiClient from 'libs/apiClient'
import profile_img from 'public/profile_img.jpg'
import { RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from 'utils/supabaseClient'
import ModalBase from 'components/parts/Modal'
import style from './TweetModal.module.scss'

export default function TweetModal(props: any): JSX.Element {
  const { open, setOpen } = props
  const { username, userId, iconPath } = useSelector((state: RootState) => state.user)

  const [tweetContents, setTweetContents] = useState<string>('')
  const [dispalayImg, setDisplayImg] = useState<string>('')
  const [file, setFile] = useState<string>('')
  const handleTweet = async (): any => {
    try {
      if (tweetContents) {
        const { data: storageData, error: storegeError } = await supabase.storage
          .from('thumbnail')
          .upload(`${userId}/${uuidv4()}`, file)
        if (storegeError) {
          throw storegeError
        }
        const { data: urlData } = supabase.storage.from('thumbnail').getPublicUrl(storageData.path)
        await apiClient.post('/post/tweet', {
          content: tweetContents,
          authorId: userId,
          authorName: username,
          authorAvatar: iconPath,
          img: urlData.publicUrl,
        })
        setTweetContents('')
        setDisplayImg('')
        setFile('')
      }
    } catch {
      alert('ツイートに失敗しました')
    }
  }

  function openFileInput(): void {
    const fileInput = document.getElementById('addImg')
    fileInput?.click()
  }

  function handleFileSelect(e: any): void {
    const selectedFile = e.target.files![0]
    setDisplayImg(URL.createObjectURL(selectedFile))
    setFile(selectedFile)
  }

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className={style.tweet_modal}>
        <div className={style.handle_close}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={style.close_btn}
            width='40'
            height='40'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#000000'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
            onClick={(): void => setOpen(!open)}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M18 6l-12 12' />
            <path d='M6 6l12 12' />
          </svg>
        </div>
        <div className={style.tweet_content}>
          <Image
            src='profile_img.jpg'
            alt={''}
            width={50}
            height={50}
            className={style.profile_img}
          />
          <textarea
            name=''
            id=''
            placeholder='What is happening'
            className={style.tweet_textarea}
            onChange={(e): void => setTweetContents(e.target.value)}
          ></textarea>
        </div>
        <div className={style.tweet_img_area}>
          {dispalayImg && (
            <Image
              src={dispalayImg}
              alt={''}
              width={500}
              height={300}
              className={style.tweet_img}
            />
          )}
        </div>
        <div className={style.handle_tweet}>
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
            onClick={(): void => openFileInput()}
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
            onChange={(e): void => handleFileSelect(e)}
          />
          <button className={style.handle_btn} onClick={handleTweet}>
            Tweet
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
