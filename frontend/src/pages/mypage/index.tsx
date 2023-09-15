import { useSelector } from 'react-redux'
import Mapage from 'components/template/mypage'
import { RootState } from 'store/store'
import NoUser from 'components/widgets/NoUser'
import { GetServerSideProps } from 'next'
import apiClient from 'libs/apiClient'
import { HttpStatusCode } from 'axios'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [dataActive, dataArchive] = await Promise.all([
    apiClient.get('/api/v1/merchants/dynamics/interviews', {
      params: {
        status: 'active',
      },
    }),
    apiClient.get('/api/v1/merchants/dynamics/interviews', {
      params: {
        status: 'archive',
      },
    }),
  ])
  if (dataActive.status !== HttpStatusCode.Ok || dataArchive.status !== HttpStatusCode.Ok)
    throw Error

  return {
    props: { interviews: dataActive.data, archiveInterviews: dataArchive.data },
  }
}

export default function MypageFile(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)

  return <>{userId.length > 0 ? <Mapage /> : <NoUser contens='Mypage' />}</>
}
