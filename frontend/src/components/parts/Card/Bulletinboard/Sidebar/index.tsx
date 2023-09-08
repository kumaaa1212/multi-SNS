import Icongenerate from 'utils/functions/Avater'
import style from './Sidebar.module.scss'
import Image from 'next/image'
import Noavater from 'public/noavater.jpg'
import { BoardRoomType, MessageType } from 'types/global'

interface Props {
  selectBoard?: BoardRoomType | undefined
  sideChat?: MessageType
  avater: string | undefined
  children: React.ReactNode
}

const SidebarChatCard = (props: Props) => {
  const { sideChat, children, avater } = props

  return (
    <div className={style.timeline_user}>
      <Image
        src={avater ? Icongenerate(avater) : '/noavater.jpg'}
        alt={'プロフィール画像'}
        width={40}
        height={40}
        className={style.profile_img}
      />
      <div className={style.card_info}>
        <div className={style.user_detail_info}>
          <span className={style.user_name}>{sideChat?.authorName}</span>
          <span className={style.publish_time}>{sideChat?.createdAt}</span>
        </div>
        <div className={style.card_content}>{children}</div>
      </div>
    </div>
  )
}

export default SidebarChatCard
