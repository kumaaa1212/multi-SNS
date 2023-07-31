import style from './Bulletinboard.module.scss'
import Image from 'next/image'
import ProfileImg from '../../../../../public/profile_img.jpg'
const BulletinboardCard = (props: any) => {
  const { children, sideMessagrBar, setSideMessagrBar } = props
  return (
    <div className={style.bulletin_board_Card}>
      <div className={style.timeline_user}>
        <Image src={ProfileImg} alt={''} width={40} height={40} className={style.profile_img} />
        <div className={style.card_info}>
          <div className={style.user_detail_info}>
            <span className={style.user_name}>KUMA</span>
            <span className={style.publish_time}>20:00</span>
          </div>
          <div className={style.card_contents}>{children}</div>
        </div>
      </div>
      <div className={style.option_btn}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          height='35'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='#000000'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          onClick={() => setSideMessagrBar(!sideMessagrBar)}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M8 9h8' />
          <path d='M8 13h6' />
          <path d='M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z' />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          height='35'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='#000000'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
        </svg>
      </div>
    </div>
  )
}

export default BulletinboardCard
