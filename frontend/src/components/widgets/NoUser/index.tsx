import Image from 'next/image'
import style from './NoUser.module.scss'

export default function NoUser(): JSX.Element {
  return (
    <div className={style.no_user}>
      <h1>No User</h1>
      <p>ログインされていません。</p>
      <p>ログインすると自分のTeamの掲示板を確認することができます。</p>
      <Image
        src='/404.jpg'
        width={600}
        height={500}
        alt='404の画像'
        className={style.no_user_img}
      />
    </div>
  )
}
