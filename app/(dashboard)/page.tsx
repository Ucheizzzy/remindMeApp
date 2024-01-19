import CreateCollectionList from '@/components/CreateCollectionList'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()

  // await new Promise((resolve) => setTimeout(resolve, 3000))
  // console.log(user)

  return (
    <div className='flex flex-col w-full mb-12 items-center space-x-4'>
      <h1 className='text-4xl font-bold'>
        Welcome {user?.firstName} {user?.lastName}
      </h1>
      <CreateCollectionList />
    </div>
  )
}
