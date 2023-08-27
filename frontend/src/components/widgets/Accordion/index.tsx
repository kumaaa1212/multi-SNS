import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import style from './Accordion.module.scss'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { createContentText, createTitleText } from '@/features/postSlice'

interface Props {
  keepPost: any[]
}

export default function ControlledAccordions(props: Props) {
  const { keepPost } = props
  const dispatch: AppDispatch = useDispatch()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleUse = (key: number) => {
    dispatch(createTitleText(keepPost[key].title))
    dispatch(createContentText(keepPost[key].content))
  }

  return (
    <div>
      {keepPost.map((post, index) => (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{post.title}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{post.createdAt}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{post.content}</Typography>
            <div className={style.use_btn}>
              <button onClick={() => handleUse(index)}>適用</button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
