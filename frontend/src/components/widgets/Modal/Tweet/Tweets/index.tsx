import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useToast } from 'components/hooks/useToast'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { jLeagueTeams } from 'utils/TeamData'
import { supabase } from 'utils/supabaseClient'
import { TeamDataType } from 'types/internal'
import Loading from 'components/layout/Loading'
import ButtonBase from 'components/parts/Button/Base'
import ModalBase from 'components/parts/Modal'
import ToastBase from 'components/parts/Toast'
import Labels from 'components/widgets/Label/Input'
import CloseIcon from '/public/svg/modal_close.svg'
import ImgIcon from '/public/svg/modal_tweet_img.svg'
import style from './TweetModal.module.scss'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TweetModal(props: Props): JSX.Element {
  const { open, setOpen } = props

  const { username, userId, iconPath, icon } = useSelector((state: RootState) => state.user)
  const [tweetContents, setTweetContents] = useState<string>('')
  const [dispalayImg, setDisplayImg] = useState<string>('')
  const [selectedLabels, setSelectedLabels] = useState<TeamDataType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [fileData, setFile] = useState<File>()

  const handleTweet = async (): Promise<void> => {
    try {
      setLoading(true)
      if (tweetContents.length <= 0 || selectedLabels.length <= 0)
        return toastFunc('本文とLabelをしてください', true)
      if (!fileData) {
        await apiClient
          .post('/post/tweet', {
            content: tweetContents,
            authorId: userId,
            authorName: username,
            authorAvatar: iconPath,
            img: '/thumbnail.png',
            label: selectedLabels[0].name,
          })
          .then((res) => {
            setTweetContents('')
            setDisplayImg('')
            setFile(undefined)
            setSelectedLabels([])
            setOpen(false)
          })
      } else {
        const { data: storageData, error: storegeError } = await supabase.storage
          .from('thumbnail')
          .upload(`${userId}/${uuidv4()}`, fileData ? fileData : '/thumbnail.png')

        if (storegeError) return toastFunc('投稿に失敗しました', true)

        const { data: urlData } = supabase.storage.from('thumbnail').getPublicUrl(storageData.path)
        await apiClient
          .post('/post/tweet', {
            content: tweetContents,
            authorId: userId,
            authorName: username,
            authorAvatar: iconPath,
            img: urlData.publicUrl,
            label: selectedLabels[0].name,
          })
          .then((res) => {
            setTweetContents('')
            setDisplayImg('')
            setFile(undefined)
            setSelectedLabels([])
            setOpen(false)
          })
      }
    } catch {
      toastFunc('投稿に失敗しました', true)
    } finally {
      setLoading(false)
    }
  }

  function openFileInput(): void {
    const fileInput = document.getElementById('addImg')
    fileInput?.click()
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>): void {
    const selectedFile = e.target.files![0]
    setDisplayImg(URL.createObjectURL(selectedFile))
    setFile(selectedFile)
  }

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div className={style.handle_close}>
        <CloseIcon className={style.close_btn} onClick={(): void => setOpen(!open)} />
      </div>
      <div className={style.tweet_content}>
        <Image src={icon} alt={''} width={50} height={50} className={style.profile_img} />
        <textarea
          placeholder='本文とLabelの入力が必須です'
          className={style.tweet_textarea}
          onChange={(e): void => setTweetContents(e.target.value)}
        ></textarea>
      </div>
      <div className={style.tweet_img_area}>
        {dispalayImg && (
          <Image
            src={dispalayImg}
            alt='投稿画像'
            width={500}
            height={300}
            className={style.tweet_img}
          />
        )}
      </div>
      <div className={style.handle_tweet}>
        <ImgIcon onClick={(): void => openFileInput()} className={style.img_icon} />
        <input
          type='file'
          id='addImg'
          style={{ display: 'none' }}
          onChange={(e): void => handleFileSelect(e)}
        />
        <Labels
          labelName='自分のチーム→使いたいラベル順番で選択してください'
          data={jLeagueTeams}
          width={400}
          setSelectedLabels={setSelectedLabels}
        />
        <ButtonBase onClick={handleTweet} content='Tweet' weight='weight_600' size='sm' black />
      </div>
      <div className={style.handle_tweet_sm}>
        <Labels
          labelName='自分のチーム→使いたいラベル順番で選択してください'
          data={jLeagueTeams}
          width={300}
          setSelectedLabels={setSelectedLabels}
        />
        <div className={style.handle_tweet_footer}>
          <ImgIcon onClick={(): void => openFileInput()} className={style.img_icon} />
          <input
            type='file'
            id='addImg'
            style={{ display: 'none' }}
            onChange={(e): void => handleFileSelect(e)}
          />
          <ButtonBase onClick={handleTweet} content='Tweet' weight='weight_600' size='sm' black />
        </div>
      </div>
      <ToastBase content={toastContent} isError={isError} active={isToast} />
      {loading && <Loading />}
    </ModalBase>
  )
}
