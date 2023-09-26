import { useEffect } from 'react'
import { Paper } from '@mui/material'
import tocbot from 'tocbot'
import style from './TableContent.module.scss'

interface Props {
  contents: string
}

export default function TableContent(props: Props): JSX.Element {
  const { contents } = props

  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.markdown',
      headingSelector: 'h1, h2, h3, h4',
      positionFixedClass: 'is-position-fixed',
    })

    return () => tocbot.destroy()
  }, [])
  return (
    <Paper elevation={3} className={style.table}>
      <div className='markdown' />
      <div className='toc is-position-fixed is-position-fixed' />
      <style jsx global>{`
        .toc {
          background-color: var(--content-bg-primary);
          border: 1px solid var(--content-border);
          border-radius: 0.25rem;
          padding: 1rem;
          font-size: 0.875rem;
        }

        .toc-list .toc-list {
          padding-left: 1rem;
          padding-top: 0.5rem;
        }

        .toc-list-item {
          padding-bottom: 0.5rem;
        }

        .toc-list-item:last-child {
          padding-bottom: 0;
        }

        .toc-link {
          color: var(--text-secondary);
        }

        .is-active-link {
          color: var(--text-primary);
          font-weight: 700;
        }
      `}</style>
    </Paper>
  )
}
