import { trpc } from "../utils/trpc"

export default function IndexPage() {
  const hello = trpc.projects.useQuery()
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{hello.data.length}</p>
    </div>
  )
}
