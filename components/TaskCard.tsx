import { Task } from '@prisma/client'

type Props = {
  task: Task
}
export default function TaskCard({ task }: Props) {
  return <div>TaskCard</div>
}
