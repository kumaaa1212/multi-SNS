import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './MarkDown.module.scss'

interface Size {
  post?: boolean
  detail?: boolean
}

interface Props extends Size {
  content: string
}

export default function MarkDown(props: Props): JSX.Element {
  const { content, post, detail } = props

  const sizeCheck = (name: string, size?: boolean): string => {
    return size ? ' ' + style[name] : ''
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`markdown ${style.markdown} + ${sizeCheck('post', post)} + ${sizeCheck(
        'detail',
        detail,
      )}`}
    >
      {content}
    </ReactMarkdown>
  )
}
