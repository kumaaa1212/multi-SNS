import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import MypageAlbum from './album'
import MypageBooKMark from './bookMark'
import MypageLikes from './like'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface a11yPropsProps {
  id: string
  'aria-controls': string
}

function CustomTabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number): a11yPropsProps {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs(): JSX.Element {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='MyAlbum' {...a11yProps(0)} />
          <Tab label='Like' {...a11yProps(1)} />
          <Tab label='BookMark' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MypageAlbum />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MypageLikes />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MypageBooKMark />
      </CustomTabPanel>
    </Box>
  )
}
