import { authenticateUser } from '@/helpers/auth'

export default async function Home() {
  const { user } = await authenticateUser()

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
