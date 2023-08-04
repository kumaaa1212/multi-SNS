import style from '../Bulletinboard.module.scss'
import Image from 'next/image'
import ProfileImg from 'public/profile_img.jpg'
const SidebarChatCard = (props: any) => {
  const { children, sideMessagrBar, setSideMessagrBar } = props
  return (
    <div className={style.sidebar_chat_Card}>
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
    </div>
  )
}

export default SidebarChatCard
