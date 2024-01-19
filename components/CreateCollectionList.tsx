import prisma from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import CreateCollectionBtn from './CreateCollectionBtn'
import SadFace from './icons/SadFace'
import CollectionCard from './CollectionCard'

export default async function CreateCollectionList() {
  const user = await currentUser()

  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  })

  if (collections.length === 0) {
    return (
      <div className='flex flex-col gap-5 mt-5'>
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started..
          </AlertDescription>
        </Alert>

        <CreateCollectionBtn />
      </div>
    )
  }
  return (
    <>
      <CreateCollectionBtn />
      <div className='flex flex-col gap-4 mt-6'>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  )
}
