import { useRouter } from 'next/router'

export default function Footer(): JSX.Element {
  const router = useRouter()

  return (
    <div className='footer bg_white pt_40'>
      <p>Copyright&copy;TOKOTOKO=J</p>
      <ul>
        <li
          onClick={(): void => {
            router.push('/footer/agreement')
          }}
        >
          利用規約
        </li>
        <li
          onClick={(): void => {
            router.push('/footer/privacy')
          }}
        >
          プライバシーポリシー
        </li>
        <li>
          <a className='contact_link' href='mailto:kuma.soccer1225@gmail.com'>
            お問い合わせ
          </a>
        </li>
      </ul>
    </div>
  )
}
