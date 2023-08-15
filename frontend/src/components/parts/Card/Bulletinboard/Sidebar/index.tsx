import style from '../Bulletinboard.module.scss'
import Image from 'next/image'
import Noavater from 'public/noavater.jpg'
const SidebarChatCard = (props: any) => {
  const { message, children } = props
  // const { authorAvatar, authorName, createdAt } = message
  console.log(message)
  return (
    <div className={style.sidebar_chat_Card}>
      <div className={style.timeline_user}>
        <Image src={message.authorAvatar ? message.authorAvatar : Noavater} alt={''} width={40} height={40} className={style.profile_img} />
        <div className={style.card_info}>
          <div className={style.user_detail_info}>
            <span className={style.user_name}>{message.authorName}</span>
            <span className={style.publish_time}>{message.createdAt}</span>
          </div>
          <div className={style.card_contents}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default SidebarChatCard
