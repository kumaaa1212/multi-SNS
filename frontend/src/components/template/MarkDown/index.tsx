import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './MarkDown.module.scss'

interface Props {
  children: any
}

const MarkDown = (props: Props): JSX.Element => {
  const { children } = props

  return (
    <div className={style.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}

export default MarkDown
