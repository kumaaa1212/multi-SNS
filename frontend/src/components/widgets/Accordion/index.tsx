import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { createContentText, createTitleText } from 'features/postSlice'
import { AppDispatch } from 'store/store'
import style from './Accordion.module.scss'

interface Props {
  keepPost: any[]
}

export default function ControlledAccordions(props: Props): JSX.Element {
  const { keepPost } = props
  const dispatch: AppDispatch = useDispatch()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleUse = (key: number): void => {
    dispatch(createTitleText(keepPost[key].title))
    dispatch(createContentText(keepPost[key].content))
  }

  return (
    <div>
      {keepPost.map((post, index) => (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} key={index}>
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
              <button onClick={(): void => handleUse(index)}>適用</button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
