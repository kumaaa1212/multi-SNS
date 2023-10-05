import { useDispatch } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { createContentText, createTitleText } from 'features/postSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import { formatTimestamp } from 'utils/functions/Time'
import { KeepAlbum } from 'types/internal/album'
import style from './Accordion.module.scss'

interface Props {
  keepPost: KeepAlbum[]
  setKeepPost: React.Dispatch<React.SetStateAction<KeepAlbum[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ControlledAccordions(props: Props): JSX.Element {
  const { keepPost, setKeepPost, setLoading } = props

  const dispatch: AppDispatch = useDispatch()
  const handleUse = (key: number): void => {
    dispatch(createTitleText(keepPost[key].title))
    dispatch(createContentText(keepPost[key].content))
  }

  const handleDelete = async (post: KeepAlbum): Promise<void> => {
    setLoading(true)
    await apiClient
      .delete(`/post/keep-post/delete/album`, {
        params: {
          postId: post.id,
        },
      })
      .then((res) => {
        if (res.status !== 200) throw Error
        setKeepPost(keepPost?.filter((keep) => keep.id !== post.id))
        setLoading(false)
      })
  }

  return (
    <div>
      {keepPost.length === 0 ? (
        <h1 className={style.no_keep}>保存されている投稿はありません</h1>
      ) : (
        <div>
          {keepPost?.map((post, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <p className={style.titile}>{post.title}</p>
                <p className={style.time}>{formatTimestamp(post.createdAt)}</p>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{post.content}</Typography>
                <div className={style.use_btn}>
                  <button
                    onClick={(): Promise<void> => handleDelete(post)}
                    className={style.delete_btn}
                  >
                    削除
                  </button>
                  <button onClick={(): void => handleUse(index)} className={style.btn}>
                    適用
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  )
}
