import { useSelector } from 'react-redux'
import Chat from 'components/template/chat'
import { RootState } from 'store/store'
import NoUser from 'components/widgets/NoUser'

export default function ChatPage(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)

  return <div>{userId ? <Chat /> : <NoUser contens='Chat' />}</div>
}
