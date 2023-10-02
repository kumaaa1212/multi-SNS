import { useSelector } from 'react-redux'
import Mapage from 'components/template/mypage'
import { RootState } from 'store/store'
import NoUser from 'components/widgets/NoUser'

export default function MypageFile(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)

  // return <>{userId.length > 0 ? <Mapage /> : <NoUser contens='Mypage' />}</>
  return <Mapage />
}
