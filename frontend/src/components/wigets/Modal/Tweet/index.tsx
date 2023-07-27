import { useState } from 'react'
import style from './TweetModal.module.scss'
import Image from 'next/image'
import profile_img from 'public/profile_img.jpg'
import apiClient from '@/libs/apiClient'
import { AuthInfo } from '@/context/auth'
// import CloseIcon from 'public/svg/close_icon.svg'
import addImgIcon from 'public/svg/addImgIcon.svg'
import ModalBase from '@/components/parts/Modal'
export default function TweetModal(props: any) {
  const { open, setOpen } = props
  const auth = AuthInfo()

  const [tweetContents, setTweetContents] = useState<string>('')

  const handleTweet = async () => {
    const res = await apiClient.post('/post/tweet', {
      content: tweetContents,
      authorId: auth.userId,
    })
    console.log(res)
  }

  function openFileInput() {
    const fileInput = document.getElementById('addImg')
    fileInput?.click()
  }

  function handleFileSelect(e: any) {
    const selectedFile = e.target.files![0]
    console.log(selectedFile)
  }

  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className={style.tweet_modal}>
        <div className={style.handle_area}>
          {/* <CloseIcon onClick={() => setOpen(!open)} className={style.close_btn} /> */}
        </div>
        <div className={style.tweet_header}>
          <Image src={profile_img} alt={''} width={50} height={50} className={style.profile_img} />
          <textarea
            name=''
            id=''
            placeholder='What is happening'
            className={style.tweet_content}
            onChange={(e) => setTweetContents(e.target.value)}
          ></textarea>
          {/* <addImgIcon onClick={() => openFileInput()} /> */}
        </div>
        <div className={style.handle_tweet}>
          <input
            type='file'
            id='addImg'
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelect(e)}
          />
          <button className={style.handle_btn} onClick={handleTweet}>
            Tweet
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
