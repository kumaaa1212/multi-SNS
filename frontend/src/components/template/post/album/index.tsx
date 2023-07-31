import React, { useState } from 'react'
import style from './Album.module.scss'
import { Paper, Tooltip } from '@mui/material'
import AlnumLayout from './albumLayout/AlbumLayout'
import 'swiper/css'
import MarkDown from '@/components/template/MarkDown'

const Album = () => {
  const [preview, setPreview] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const [titleText, setTitleText] = useState<string>('')
  const [contentText, setContentText] = useState<string>('')

  const openFileInput = () => {
    const fileInput = document.getElementById('markdown_file_input')
    fileInput?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile)
      setFile(selectedFile)
      handleInsertImage(imageURL)
    }
  }

  const handleInsertImage = (imageURL: string) => {
    if (imageURL) {
      const imageMarkdown = `![](${imageURL})`
      setContentText(contentText + imageMarkdown);
    }
  }

  return (
    <div className='album'>
      <AlnumLayout titleText={titleText} contentText={contentText}>
        <div className={style.album_main}>
          <input
            type='text'
            placeholder='title'
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
          <div className={style.content}>
            <div className={style.preview_area}>
              {preview ? (
                <Paper elevation={3}>
                  <MarkDown>{contentText}</MarkDown>
                </Paper>
              ) : (
                <Paper elevation={3}>
                  <textarea
                    name=''
                    placeholder='マークダウン形式で入力してください'
                    value={contentText}
                    className={style.album_text}
                    onChange={(e) => setContentText(e.target.value)}
                  />
                </Paper>
              )}
            </div>
            <div className={style.content_btn}>
              {preview ? (
                <Tooltip title='プレビュー'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='50'
                    height='50'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='#ffffff'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    onClick={() => setPreview(!preview)}
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4' />
                    <path d='M13.5 6.5l4 4' />
                  </svg>
                </Tooltip>
              ) : (
                <Tooltip title='プレビュー'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='50'
                    height='50'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='#ffffff'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    onClick={() => setPreview(!preview)}
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 18l6 -6l-6 -6v12' />
                  </svg>
                </Tooltip>
              )}
              <Tooltip title='書き方'>
                <a href='https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-question-mark'
                    width='50'
                    height='50'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='#ffffff'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4' />
                    <path d='M12 19l0 .01' />
                  </svg>
                </a>
              </Tooltip>
              <Tooltip title='写真を追加'>
                <div onClick={() => openFileInput()}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-plus'
                    width='50'
                    height='50'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='#ffffff'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 5l0 14' />
                    <path d='M5 12l14 0' />
                  </svg>
                  <input
                    type='file'
                    id='markdown_file_input'
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </AlnumLayout>
    </div>
  )
}

export default Album
