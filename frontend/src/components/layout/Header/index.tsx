import Link from 'next/link'
import BadgeAvatars from '@/components/parts/Account'
const Header = () => {
  return (
    <header className='header'>
      <nav className='header_nav'>
        <Link href={''}></Link>
        <div className='header_nav_link'>
          <Link href={'/'} className='nav_link'></Link>
          <Link href={'/home'} className='nav_link link_style'>
            HOME
          </Link>
          <Link href={'/chat'} className='nav_link link_style'>
            CHAT
          </Link>
          <Link href={'/mypage'} className='nav_link link_style'>
            MYPAGE
          </Link>
          <Link href={'/board'} className='nav_link link_style'>
            BOARD
          </Link>
          <BadgeAvatars />
        </div>
      </nav>
    </header>
  )
}

export default Header
