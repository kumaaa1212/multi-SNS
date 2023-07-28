import ReactMarkdown from 'react-markdown';
import style from './MarkDown.module.scss';
import remarkGfm from 'remark-gfm';
interface Props {
  children: any;
}


const MarkDown = (props:Props) => {
  const { children } = props;

  return (
    <div className={style.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  )
};

export default MarkDown;