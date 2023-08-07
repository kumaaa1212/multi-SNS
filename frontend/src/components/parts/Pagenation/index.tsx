import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function BasicPagination(props: any) {
  const { currentPage, setCurrentPage, pagelenght } = props

  return (
    <div className='pagenation_area'>
      <Stack spacing={2}>
        <Pagination
          count={Math.floor(pagelenght / 6) + 1}
          color='primary'
          page={currentPage}
          onChange={(event, page: number) => setCurrentPage(page)}
        />
      </Stack>
    </div>
  )
}
