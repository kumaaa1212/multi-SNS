import { useEffect, useState } from 'react'
import style from './AlbumLayout.module.scss'
import HorizontalLinearStepper from '@/components/parts/Stepper'
import SwitchBtn from '@/components/parts/Button/SwitchBtn'
import { useRouter } from 'next/router'
import AbjustModal from '@/components/widgets/Modal/Abjustment'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import apiClient from '@/libs/apiClient'
import { supabase } from '@/utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import { stateReset } from '@/features/postSlice'
import KeepModal from '@/components/widgets/Modal/Keep'

interface Props {
  children: React.ReactNode
  titleText?: string
  contentText?: string
}

const AlnumLayout = (props: Props) => {
  const { children } = props

  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const [keepPost, setKeepPost] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [relese, setRelese] = useState<boolean>(false)
  const [ideaOpen, setIdeaOpen] = useState<boolean>(false)
  const [keepOpen, setKeepOpen] = useState<boolean>(false)
  const [abjustOpen, setAbjustOpen] = useState<boolean>(false)

  const { thumbnailText, titleText, labels, contentText, thumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const { username, userId, iconPath } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (router.pathname === '/post/album/thumbnail') {
      setActiveStep(1)
      setRelese(!relese)
    }
  }, [])

  const handleReverse = () => {
    if (router.pathname === '/post/album/thumbnail') {
      router.push('/post')
    } else if (router.pathname === '/post') {
      router.push('/mypage')
    }
  }

  const handleKeep = async () => {
    await apiClient.post('/post/keep-post/save', {
      title: titleText,
      content: contentText,
      authorId: userId,
    })
  }
  
  const handleRelease = async () => {
    if (!(thumbnailText && titleText && labels && contentText)) {
      alert('必要な情報が入力されていません')
    } else {
      try {
        if (thumbnailImg === '') {
          try {
            await apiClient.post('/post/album', {
              title: titleText,
              content: contentText,
              labels: labels,
              thumbnailText: thumbnailText,
              authorId: userId,
              authorName: username,
              authorAvatar: iconPath,
              thumbnailImg: '',
            })
            dispatch(stateReset())
          } catch {
            alert('投稿に失敗しました')
          }
        } else {
          try {
            const { data: storageData, error: storegeError } = await supabase.storage
              .from('thumbnail')
              .upload(`${userId}/${uuidv4()}`, thumbnailImg)
            if (storegeError) {
              throw storegeError
            }
            const { data: urlData } = supabase.storage
              .from('thumbnail')
              .getPublicUrl(storageData.path)
            await apiClient.post('/post/album', {
              title: titleText,
              content: contentText,
              labels: labels,
              thumbnailText: thumbnailText,
              authorId: userId,
              authorName: username,
              authorAvatar: iconPath,
              thumbnailImg: urlData.publicUrl,
            })
            dispatch(stateReset())
          } catch {
            alert('投稿に失敗しました')
          }
        }
        router.push('/post/album/release')
      } catch {
        alert('投稿に失敗しました')
      }
    }
  }

  return (
    <div>
      <div className={style.album_header}>
        {ideaOpen && <AbjustModal open={ideaOpen} setOpen={setIdeaOpen} />}
        {keepOpen && <KeepModal open={keepOpen} setOpen={setKeepOpen} />}
        <button onClick={handleReverse} className={style.album_btn}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-arrow-left'
            width='50'
            height='50'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='#000000'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l14 0' />
            <path d='M5 12l6 6' />
            <path d='M5 12l6 -6' />
          </svg>
        </button>
        <HorizontalLinearStepper activeStep={activeStep} />
        <div className={style.header_right}>
          <div className={style.abjust_area}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='#000000'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              onClick={() => setAbjustOpen(!abjustOpen)}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
              <path d='M6 4l0 2' />
              <path d='M6 11l0 9' />
              <path d='M10 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
              <path d='M12 4l0 10' />
              <path d='M12 19l0 1' />
              <path d='M16 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
              <path d='M18 4l0 1' />
              <path d='M18 11l0 9' />
            </svg>
            {abjustOpen && (
              <div className={style.abjust_dropdown}>
                <ul>
                  <li className={style.drowdown_list} onClick={() => setKeepOpen(!keepOpen)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='30'
                      height='30'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='#2c3e50'
                      fill='none'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' />
                      <path d='M7 11l5 5l5 -5' />
                      <path d='M12 4l0 12' />
                    </svg>
                    <p> 保存一覧</p>
                  </li>
                  <li className={style.drowdown_list} onClick={() => setIdeaOpen(!ideaOpen)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='30'
                      height='30'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='#2c3e50'
                      fill='none'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7' />
                      <path d='M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3' />
                      <path d='M9.7 17l4.6 0' />
                    </svg>
                    <p>Idea</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <SwitchBtn keepPost={keepPost} setKeepPost={setKeepPost} relese={relese} />
          </div>
          <div>
            {keepPost || relese ? (
              <div>
                {relese ? (
                  <button className={style.keep_btn} onClick={handleRelease}>
                    公開
                  </button>
                ) : (
                  <button
                    className={style.keep_btn}
                    onClick={() => router.push('/post/album/thumbnail')}
                  >
                    次へ進む
                  </button>
                )}
              </div>
            ) : (
              <button className={style.keep_btn} onClick={handleKeep}>下書き保存</button>
            )}
          </div>
        </div>
      </div>
      <div className={style.album_main}>{children}</div>
    </div>
  )
}

export default AlnumLayout
