import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PostBtn from '@/components/parts/Button/Post/addbtn'
import TweetModal from '@/components/wigets/Modal/Tweet'
import CustomizedInputBase from '@/components/parts/Search/PostSearch'
import RecipeReviewCard from '@/components/parts/Card'
import BasicPagination from '@/components/parts/Pagenation'
import style from './TimeLine.module.scss'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function TimeLine() {
  const [value, setValue] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className='timeline_tab'>
      <Box sx={{ width: '100%' }}>
        <div className={style.timeline_header}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' centered>
              <Tab label='Post' {...a11yProps(0)} disableRipple />
              <Tab label='Like' {...a11yProps(1)} disableRipple />
              <Tab label='BookMark' {...a11yProps(2)} disableRipple />
            </Tabs>
          </Box>
          <CustomizedInputBase />
        </div>
        <div className={style.timeline_}>
        <CustomTabPanel value={value} index={0}>
          <div className={style.tab_content}>
          <RecipeReviewCard />
          <RecipeReviewCard />
          <RecipeReviewCard />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <p>jjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</p>
          <RecipeReviewCard />
          <RecipeReviewCard />
          <RecipeReviewCard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <p>njnjnjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnj</p>
          <RecipeReviewCard />
          <RecipeReviewCard />
          <RecipeReviewCard />
        </CustomTabPanel>
        </div>
      </Box>
      <BasicPagination />
    </div>
  )
}
