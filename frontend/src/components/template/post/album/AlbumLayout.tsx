import React from 'react'
import style from '../Post.module.scss'
import Link from 'next/link'
import HorizontalNonLinearStepper from '@/components/parts/Stepper'
import SwitchBtn from '@/components/parts/Button/SwitchBtn'
import { useRouter } from 'next/router'
import ReturnIcon from '../../../../../public/svg/return_icon.svg'
import SettingMeter from '../../../../../public/svg/setting_meter.svg'
const AlnumLayout = ({children}:any) => {
  const [keepPost, setKeepPost] = React.useState(false)
  const router = useRouter()

  return (
    <div>
      <div className={style.album_header}>
        <Link href={'/mypage'}>
          <ReturnIcon />
        </Link>
        <HorizontalNonLinearStepper />
        <div className={style.header_right}>
          <SettingMeter />
          <SwitchBtn keepPost={keepPost} setKeepPost={setKeepPost} />
          {keepPost ? (
            <button className={style.keep_btn} onClick={() => router.push('/post/album/Thumbnail')}>
              次へ進む
            </button>
          ) : (
            <button className={style.keep_btn}>下書き保存</button>
          )}
        </div>
      </div>
      <div className={style.album_main}>
        {children}
      </div>
    </div>
  )
}

export default AlnumLayout
