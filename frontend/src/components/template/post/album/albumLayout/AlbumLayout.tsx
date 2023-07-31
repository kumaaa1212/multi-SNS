import { useEffect, useState } from 'react'
import style from './AlbumLayout.module.scss'
import HorizontalLinearStepper from '@/components/parts/Stepper'
import SwitchBtn from '@/components/parts/Button/SwitchBtn'
import { useRouter } from 'next/router'
import AbjustModal from '@/components/wigets/Modal/Abjustment'

interface Props {
  children: React.ReactNode
  titleText?: string
  contentText?: string
}

const AlnumLayout = (props: Props) => {
  const { children, titleText, contentText } = props
  const [keepPost, setKeepPost] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [relese, setRelese] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [abjustOpen, setAbjustOpen] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/post/album/thumbnail') {
      setActiveStep(1)
      setRelese(!relese)
    } else if (router.pathname === '/post/album/thumbnail') {
    }
  }, [])

  const handleReverse = () => {
    console.log(router.pathname)
    if (router.pathname === '/post/album/thumbnail') {
      router.push('/post/album')
    } else if (router.pathname === '/post/album') {
      router.push('/mypage')
    }
  }

  return (
    <div>
      <div className={style.album_header}>
        {open && <AbjustModal open={open} setOpen={setOpen} />}
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
                  <li className={style.drowdown_list}>保存一覧</li>
                  <li className={style.drowdown_list} onClick={() => setOpen(!open)}>
                    Idea
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
                  <button
                    className={style.keep_btn}
                    onClick={() => router.push('/post/album/release')}
                  >
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
              <button className={style.keep_btn}>下書き保存</button>
            )}
          </div>
        </div>
      </div>
      <div className={style.album_main}>{children}</div>
    </div>
  )
}

export default AlnumLayout
