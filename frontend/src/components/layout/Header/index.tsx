import Link from 'next/link'
import BadgeAvatars from '@/components/parts/Account'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { jLeagueTeams } from '@/utils/TeamData'

const Header = () => {
  const { team, userId } = useSelector((state: RootState) => state.user)

  const filterTeam = jLeagueTeams.filter((item) => item.name === team)
  return (
    <header className='header'>
      <nav className='header_nav'>
        <Link href='/mypage' className='header_logo_area'>
          {/* <Image src={Logo} alt={''} className='header_logo' /> */}
        </Link>
        <div className='header_nav_link'>
          <Link href='/home' className='nav_link link_style'>
            HOME
          </Link>
          <Link href='/chat' className='nav_link link_style'>
            CHAT
          </Link>
          <Link href='/mypage' className='nav_link link_style'>
            MYPAGE
          </Link>
          <Link href={`/board/${filterTeam[0]?.label}`} className='nav_link link_style'>
            BOARD
          </Link>
          <BadgeAvatars />
        </div>
      </nav>
    </header>
  )
}

export default Header
