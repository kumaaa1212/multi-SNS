import Profile from './profile'
import BasicTabs from './timeline'

const Mapage = (): JSX.Element => {
  return (
    <div className='mypage'>
      <Profile />
      <BasicTabs />
    </div>
  )
}

export default Mapage
