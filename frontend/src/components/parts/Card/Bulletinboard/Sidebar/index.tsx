import Image from 'next/image'
import Icongenerate from 'utils/functions/Avater'
import { BoardMessageType, BoardType } from 'types/global'
import style from './Sidebar.module.scss'

interface Props {
  contents?: BoardType | BoardMessageType | undefined
  avater: string | undefined
  children: React.ReactNode
}

const SidebarChatCard = (props: Props): JSX.Element => {
  const { children, avater, contents } = props

  return (
    <div className={style.timeline_user}>
      <Image
        src={avater ? Icongenerate(avater) : '/noavater.jpg'}
        alt='プロフィール画像'
        width={40}
        height={40}
        className={style.profile_img}
      />
      <div className={style.card_info}>
        <div className={style.user_detail_info}>
          <span className={style.user_name}>{contents?.authorName}</span>
          <span className={style.publish_time}>{contents?.createdAt}</span>
        </div>
        <div className={style.card_content}>{children}</div>
      </div>
    </div>
  )
}

export default SidebarChatCard
