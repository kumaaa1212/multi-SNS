import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { stateReset } from 'features/postSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch, RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from 'utils/supabaseClient'
import Button from 'components/parts/Button/Base'
import SwitchBtn from 'components/parts/Button/SwitchBtn'
import HorizontalLinearStepper from 'components/parts/Stepper'
import AbjustModal from 'components/widgets/Modal/Abjustment'
import KeepModal from 'components/widgets/Modal/Keep'
import ReverseIcon from '/public/svg/post_reverse.svg'
import AbjustIcon from '/public/svg/post_abjust.svg'
import DowunLoadIcon from '/public/svg/post_download.svg'
import IdeaIcon from '/public/svg/post_idea.svg'
import style from './AlbumLayout.module.scss'

interface Props {
  children: React.ReactNode
  titleText?: string
  contentText?: string
}

const AlnumLayout = (props: Props): JSX.Element => {
  const { children } = props

  const router = useRouter()
  const [keepPost, setKeepPost] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [relese, setRelese] = useState<boolean>(false)
  const [ideaOpen, setIdeaOpen] = useState<boolean>(false)
  const [keepOpen, setKeepOpen] = useState<boolean>(false)
  const [abjustOpen, setAbjustOpen] = useState<boolean>(false)

  const dispatch: AppDispatch = useDispatch()
  const { thumbnailText, titleText, labels, contentText, thumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const { username, userId, iconPath } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (router.pathname === '/post/album/thumbnail') {
      setActiveStep(1)
      setRelese((prev) => !prev)
    }
  }, [router.pathname])

  const handleReverse = (): void => {
    if (router.pathname === '/post/album/thumbnail') {
      router.push('/post')
    } else if (router.pathname === '/post') {
      router.push('/mypage')
    }
  }

  const handleKeep = async (): Promise<void> => {
    await apiClient.post('/post/keep-post/save', {
      title: titleText,
      content: contentText,
      authorId: userId,
    })
  }

  const handleRelease = async (): Promise<void> => {
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
        <ReverseIcon onClick={handleReverse} className={style.album_btn} />
        <HorizontalLinearStepper activeStep={activeStep} />
        <div className={style.header_right}>
          <div className={style.abjust_area}>
            <AbjustIcon
              onClick={(): void => {
                setAbjustOpen(!abjustOpen)
              }}
            />
            {abjustOpen && (
              <ul className={style.abjust_dropdown}>
                <li className={style.drowdown_list} onClick={(): void => setKeepOpen(!keepOpen)}>
                  <DowunLoadIcon />
                  <p> 保存一覧</p>
                </li>
                <li className={style.drowdown_list} onClick={(): void => setIdeaOpen(!ideaOpen)}>
                  <IdeaIcon />
                  <p>Idea</p>
                </li>
              </ul>
            )}
          </div>
          <div>
            <SwitchBtn keepPost={keepPost} setKeepPost={setKeepPost} relese={relese} />
          </div>
          <div>
            {keepPost || relese ? (
              <div>
                {relese ? (
                  <Button
                    content='公開'
                    onClick={handleRelease}
                    className='ml_10'
                    size='md'
                    weight='weight_600'
                    black
                  />
                ) : (
                  <Button
                    content='次へ進む'
                    onClick={(): void => {
                      router.push('/post/album/thumbnail')
                    }}
                    className='ml_10'
                    size='md'
                    weight='weight_600'
                    black
                  />
                )}
              </div>
            ) : (
              <Button
                content='下書き保存'
                onClick={handleKeep}
                className='ml_10'
                size='md'
                weight='weight_600'
                black
              />
            )}
          </div>
        </div>
      </div>
      <div className={style.album_main}>{children}</div>
    </div>
  )
}

export default AlnumLayout
