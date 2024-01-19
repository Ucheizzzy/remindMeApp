import { Collection, Task } from '@prisma/client'

type Props = {
  collection: Collection & {
    tasks: Task[]
  }
}

export default function CollectionCard({ collection }: Props) {
  return <div>CollectionCard</div>
}
