import Image from 'next/image'
import { useFormattedTimestamp } from 'components/hooks/useTime'
import Icongenerate from 'utils/functions/Avater'
import { BoardMessageType, BoardType } from 'types/internal/board'
import style from './Sidebar.module.scss'

interface Props {
  contents?: BoardType | BoardMessageType | undefined
  avater: string | undefined
  children: React.ReactNode
}

export default function SidebarChatCard(props: Props): JSX.Element {
  const { children, avater, contents } = props

  const formattedTimestamp = useFormattedTimestamp(contents?.createdAt)

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
        <div className='fw_700'>
          <span className={style.user_name}>{contents?.authorName}</span>
          <span className={style.publish_time}>{formattedTimestamp}</span>
        </div>
        <div className={style.card_content}>{children}</div>
      </div>
    </div>
  )
}
