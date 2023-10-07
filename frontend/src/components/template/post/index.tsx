import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Tooltip } from '@mui/material'
import Layout from 'components/layout'
import { addDisplayImgcontents, addImgcontents, createDisplayContentText } from 'features/postSlice'
import { createContentText, createTitleText } from 'features/postSlice'
import ReproductionIcon from '/public/svg/post_ reproduction.svg'
import PreviewIcon from '/public/svg/post_ reproduction.svg'
import AddImgIcon from '/public/svg/post_add_img.svg'
import { AppDispatch, RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from 'utils/supabaseClient'
import style from './Album.module.scss'
import AlnumLayout from './_container/albumLayout/AlbumLayout'
import Meta from 'components/layout/Head'
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
        dispatch(addImgcontents(urlData.publicUrl))
        dispatch(addDisplayImgcontents(imageMarkdown))
      }
    }
  }

  return (
    <Layout
      isSaveBar={isSaveBar}
      setIsSaveBar={setIsSaveBar}
      discardModalOpen={open}
      discardModalClose={setOpen}
      bgColor='bg_gray'
    >
      <Meta title='アルバム' />
      <AlnumLayout setIsSaveBar={setIsSaveBar}>
        <div className='full_width item_center_y'>
          <input
            className={style.input}
            type='text'
            placeholder='title(10文字以内)'
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
                <Paper elevation={3} className={style.album_text_area}>
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
              <div>
                {preview ? (
                  <Tooltip title='プレビュー'>
                    <>
                      <ReproductionIcon
                        onClick={(): void => {
                          setPreview(!preview)
                        }}
                      />
                    </>
                  </Tooltip>
                ) : (
                  <Tooltip title='プレビュー'>
                    <>
                      <PreviewIcon onClick={(): void => setPreview(!preview)} />
                    </>
                  </Tooltip>
                )}
              </div>
              <div>
                <Tooltip title='写真を追加'>
                  <>
                    <AddImgIcon onClick={(): void => openFileInput()} />
                  </>
                </Tooltip>
                <input
                  type='file'
                  id='markdown_file_input'
                  style={{ display: 'none' }}
                  onChange={(e): Promise<void> => handleFileChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </AlnumLayout>
    </Layout>
  )
}
