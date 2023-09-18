import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { jLeagueTeams } from 'utils/TeamData'
import { supabase } from 'utils/supabaseClient'
import { TeamDataType } from 'types/global'
import ButtonBase from 'components/parts/Button/Base'
import ModalBase from 'components/parts/Modal'
import Labels from 'components/widgets/Label'
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
  const [fileData, setFile] = useState<File>()

  const handleTweet = async (): Promise<void> => {
    try {
      if (tweetContents && fileData && selectedLabels.length === 1) {
        const { data: storageData, error: storegeError } = await supabase.storage
          .from('thumbnail')
          .upload(`${userId}/${uuidv4()}`, fileData ? fileData : '')
        if (storegeError) {
          throw storegeError
        }
        const { data: urlData } = supabase.storage.from('thumbnail').getPublicUrl(storageData.path)
        await apiClient.post('/post/tweet', {
          content: tweetContents,
          authorId: userId,
          authorName: username,
          authorAvatar: iconPath,
          img: urlData.publicUrl ? urlData.publicUrl : '',
          label: selectedLabels[0].name,
        })
        setTweetContents('')
        setDisplayImg('')
        setFile(undefined)
        setSelectedLabels([])
        setOpen(false)
      }
    } catch {
      alert('ツイートに失敗しました')
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
      <div className={style.tweet_modal}>
        <div className={style.handle_close}>
          <CloseIcon className={style.close_btn} onClick={(): void => setOpen(!open)} />
        </div>
        <div className={style.tweet_content}>
          <Image src={icon} alt={''} width={50} height={50} className={style.profile_img} />
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
              alt='投稿画像'
              width={500}
              height={300}
              className={style.tweet_img}
            />
          )}
        </div>
        <div className={style.handle_tweet}>
          <ImgIcon onClick={(): void => openFileInput()} />
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
      </div>
    </ModalBase>
  )
}
