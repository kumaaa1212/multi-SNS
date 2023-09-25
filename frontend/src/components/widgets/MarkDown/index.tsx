import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './MarkDown.module.scss'

interface Props {
  content: string
  className?: string
}

export default function MarkDown(props: Props): JSX.Element {
  const { content, className } = props

  return (
    <div className={style.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown-body'>
        {content}
      </ReactMarkdown>
    </div>
  )
}
