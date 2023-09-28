import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Tooltip } from '@mui/material'
import Layout from 'components/layout'
import { addDisplayImgcontents, addImgcontents, createDisplayContentText } from 'features/postSlice'
import { createContentText, createTitleText } from 'features/postSlice'
import ReproductionIcon from '/public/svg/post_ reproduction.svg'
import PreviewIcon from '/public/svg/post_ reproduction.svg'
import QuestionIcon from '/public/svg/post_question.svg'
import AddImgIcon from '/public/svg/post_add_img.svg'
import { AppDispatch, RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from 'utils/supabaseClient'
import style from './Album.module.scss'
import AlnumLayout from './_container/albumLayout/AlbumLayout'
import MarkDown from 'components/widgets/MarkDown'

export default function Album(): JSX.Element {
  const dispatch: AppDispatch = useDispatch()
  const { titleText, displayContentText } = useSelector((state: RootState) => state.post)
  const { userId } = useSelector((state: RootState) => state.user)
  const [preview, setPreview] = useState<boolean>(false)
  const [isSaveBar, setIsSaveBar] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const openFileInput = (): void => {
    const fileInput = document.getElementById('markdown_file_input')
    fileInput?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const imageMarkdown = `![](${URL.createObjectURL(selectedFile)})`
      const { data: storageData, error: storegeError } = await supabase.storage
        .from('thumbnail')
        .upload(`${userId}/${uuidv4()}`, selectedFile ? selectedFile : '')
      if (!storegeError) {
        const { data: urlData } = supabase.storage.from('thumbnail').getPublicUrl(storageData.path)
        dispatch(addImgcontents(urlData))
        dispatch(addDisplayImgcontents(imageMarkdown))
      }
    }
  }

  return (
    <Layout
      isSaveBar={isSaveBar}
      discardModalOpen={open}
      discardModalClose={setOpen}
      bgColor='bg_gray'
    >
      <Meta title='アルバム' />
      <AlnumLayout setIsSaveBar={setIsSaveBar}>
        <div className='full_width'>
          <input
            className={style.input}
            type='text'
            placeholder='title (10文字以内で入力してください)'
            value={titleText}
            onChange={(e): void => {
              dispatch(createTitleText(e.target.value))
            }}
          />
          <div className={style.content}>
            <div className={style.preview_area}>
              {preview ? (
                <Paper elevation={3}>
                  <MarkDown content={displayContentText} post />
                </Paper>
              ) : (
                <Paper elevation={3}>
                  <textarea
                    name=''
                    placeholder='マークダウン形式で入力してください'
                    value={displayContentText}
                    className={style.album_text}
                    onChange={(e): void => {
                      dispatch(createContentText(e.target.value))
                      dispatch(createDisplayContentText(e.target.value))
                    }}
                  />
                </Paper>
              )}
            </div>
            <div className={style.content_btn}>
              {preview ? (
                <Tooltip title='プレビュー'>
                  <ReproductionIcon
                    onClick={(): void => {
                      setPreview(!preview)
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title='プレビュー'>
                  <PreviewIcon onClick={(): void => setPreview(!preview)} />
                </Tooltip>
              )}
              <Tooltip title='書き方'>
                <a href='https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'>
                  <QuestionIcon />
                </a>
              </Tooltip>
              <Tooltip title='写真を追加'>
                <div onClick={(): void => openFileInput()}>
                  <AddImgIcon />
                  <input
                    type='file'
                    id='markdown_file_input'
                    style={{ display: 'none' }}
                    onChange={(e): Promise<void> => handleFileChange(e)}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </AlnumLayout>
    </Layout>
  )
}
