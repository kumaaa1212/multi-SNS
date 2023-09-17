import { useState } from 'react'
import Button from 'components/parts/Button/Base'
import SerchInput from 'components/parts/Input/Serch'
import BasicPagination from 'components/parts/Pagenation'
import style from './Post.module.scss'

interface Props {
  newButton: string
  popularButton: string
  inputName: string
  albumserch: string
  click: boolean
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
  setAlbumserch: React.Dispatch<React.SetStateAction<string>>
  children: React.ReactNode
}

export default function PostTemPlate(props: Props): JSX.Element {
  const { newButton, popularButton, inputName, children } = props
  const { albumserch, setAlbumserch, click, setClicked } = props

  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div className={style.article_contents}>
      <div className={style.search_area}>
        <div className={style.search_btn_area}>
          <Button
            content={newButton}
            onClick={(): void => setClicked(!click)}
            className='mh_16'
            size='md'
            weight='weight_600'
            black={click ? true : false}
          />
          <Button
            content={popularButton}
            onClick={(): void => setClicked(!click)}
            className='mh_16'
            size='md'
            weight='weight_600'
            black={click ? false : true}
          />
        </div>
        <SerchInput
          value={albumserch}
          placeholder={inputName}
          onChange={(e): void => setAlbumserch(e.target.value)}
        />
      </div>
      <div>{children}</div>
      <div className={style.pagenation}>
        {click ? (
          <BasicPagination setCurrentPage={setCurrentPage} pagelenght={0} clasName='mv_64' />
        ) : (
          <BasicPagination setCurrentPage={setCurrentPage} pagelenght={0} clasName='mv_64' />
        )}
      </div>
    </div>
  )
}
