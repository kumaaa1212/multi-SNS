import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './MarkDown.module.scss'

interface Props {
  children: React.ReactNode
}

export default function MarkDown(props: Props): JSX.Element {
  const { children } = props

  return (
    <div className={style.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
