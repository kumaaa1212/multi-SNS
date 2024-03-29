import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useToast } from 'components/hooks/useToast'
import { stateReset } from 'features/postSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch, RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from 'utils/supabaseClient'
import Loading from 'components/layout/Loading'
import Button from 'components/parts/Button/Base'
import SwitchBtn from 'components/parts/Button/Switch'
import HorizontalLinearStepper from 'components/parts/Stepper'
import ToastBase from 'components/parts/Toast'
import IdeaModal from 'components/widgets/Modal/Abjustment'
import KeepModal from 'components/widgets/Modal/Keep'
import ReverseIcon from '/public/svg/post_reverse.svg'
import AbjustIcon from '/public/svg/post_abjust.svg'
import DowunLoadIcon from '/public/svg/post_download.svg'
import IdeaIcon from '/public/svg/post_idea.svg'
import style from './AlbumLayout.module.scss'

interface Props {
  children: React.ReactNode
  setIsSaveBar?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlnumLayout(props: Props): JSX.Element {
  const { children, setIsSaveBar = (): boolean => false } = props

  const router = useRouter()
  const [keepPost, setKeepPost] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [relese, setRelese] = useState<boolean>(false)
  const [ideaOpen, setIdeaOpen] = useState<boolean>(false)
  const [keepOpen, setKeepOpen] = useState<boolean>(false)
  const [abjustOpen, setAbjustOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch: AppDispatch = useDispatch()
  const { thumbnailText, titleText, labels, contentText, thumbnailImg } = useSelector(
    (state: RootState) => state.post,
  )
  const { username, userId, iconPath, icon } = useSelector((state: RootState) => state.user)
  const { toastContent, isError, isToast, toastFunc } = useToast()

  useEffect(() => {
    if (router.pathname === '/post/album/thumbnail') {
      setActiveStep(1)
      setRelese(true)
    }
  }, [router.pathname])

  const handleReverse = (): void => {
    if (titleText.length > 0 || contentText.length > 0) {
      setIsSaveBar(true)
    } else {
      if (router.pathname === '/post/album/thumbnail') {
        router.push('/post')
      } else if (router.pathname === '/post') {
        router.push('/mypage')
      }
    }
  }

  const handleKeep = async (): Promise<void> => {
    setLoading(true)
    await apiClient
      .post('/post/keep-post/save', {
        title: titleText,
        content: contentText,
        authorId: userId,
      })
      .then(() => {
        setLoading(false)
      })
  }

  const handleRelease = async (): Promise<void> => {
    if (!(thumbnailText && titleText && labels.length > 0 && contentText)) {
      toastFunc('必要な情報が入力されていません', true)
    } else {
      setLoading(true)
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
              authorAvatar: icon,
              thumbnailImg: '',
            })
            dispatch(stateReset())
          } catch {
            toastFunc('投稿に失敗しました', true)
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
            toastFunc('投稿に失敗しました', true)
          }
        }
        router.push('/post/album/release')
      } catch {
        toastFunc('投稿に失敗しました', true)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      {ideaOpen && <IdeaModal open={ideaOpen} setOpen={setIdeaOpen} />}
      {keepOpen && <KeepModal open={keepOpen} setOpen={setKeepOpen} />}
      <div className={style.album_header}>
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
          <SwitchBtn keepPost={keepPost} setKeepPost={setKeepPost} relese={relese} />
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
      <ToastBase isError={isError} active={isToast} content={toastContent} />
      {loading && <Loading />}
    </div>
  )
}
