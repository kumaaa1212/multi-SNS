import { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pagelenght: number
  clasName?: string
}

const BasicPagination = (props: Props): JSX.Element => {
  const { setCurrentPage, pagelenght, clasName } = props
  const [pageNumber, setPageNumber] = useState<number>(1)

  return (
    <div className={`pagenation_area ${clasName}`}>
      <Stack spacing={2}>
        <Pagination
          count={Math.floor(pagelenght / 6 + 1)}
          color='primary'
          page={pageNumber}
          onChange={(_event, page: number): void => {
            setPageNumber(page)
            setCurrentPage((page - 1) * 6)
          }}
        />
      </Stack>
    </div>
  )
}
export default BasicPagination
