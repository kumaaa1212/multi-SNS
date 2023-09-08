import { Paper } from '@mui/material'
import BasicTabs from 'components/parts/Tabs/RankTab'
import ProfileList from 'components/template/mypage/profile/ProfileList'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Paper elevation={2}>
        <ProfileList />
      </Paper>
      <Paper elevation={2}>
        <BasicTabs />
      </Paper>
    </div>
  )
}

export default Sidebar
