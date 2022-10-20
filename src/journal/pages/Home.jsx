import { JournalLayout } from '../layout'
import { Note } from '../views'

export const Home = () => {
  return (
    <JournalLayout>
      {/* <NothingSelected /> */}
      <Note />
    </JournalLayout>
  )
}
