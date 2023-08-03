import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../public/logo.png'
// eslint-disable-next-line import/no-unresolved
import BadgeAvatars from '@/components/parts/Account'
const Header = () => {
  return (
    <header className='header'>
      <nav className='header_nav'>
        <Link href={''}></Link>
        <div className='header_nav_link'>
          <Link href={'/'} className='nav_link'>
          </Link>
          <Link href={'/home'} className='nav_link link_style'>
            HOME
          </Link>
          <Link href={'/chat'} className='nav_link link_style'>
            CHAT
          </Link>
          <Link href={'/mypage'} className='nav_link link_style'>
            MYPAGE
          </Link>
          <Link href={'/bulletinBoard'} className='nav_link link_style'>
          BULLETIN BOARD
          </Link>
          <BadgeAvatars />
        </div>
      </nav>
    </header>
  )
}

export default Header
