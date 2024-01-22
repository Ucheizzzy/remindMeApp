'use client'
import { Collection, Task } from '@prisma/client'
import { useState, useTransition } from 'react'
import CreateTaskDialog from './CreateTaskDialog'
import { useRouter } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'

type Props = {
  collection: Collection & {
    tasks: Task[]
  }
}

export default function CollectionCard({ collection }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const { refresh } = useRouter()

  const [isLoading, startTransition] = useTransition()

  const tasks = collection.tasks
  return (
    <>
      <CreateTaskDialog />

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              'flex w-full justify-between p-6',
              isOpen && 'rounded-b-none',
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className='text-white font-bold'>{collection.name}</span>
            {!isOpen && <CaretDownIcon className='h-6 w-6' />}
            {isOpen && <CaretUpIcon className='h-6 w-6' />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg'>
          {tasks.length === 0 && (
            <Button
              variant={'ghost'}
              className='flex items-center justify-center gap-1 p-8 py-22 rounded-none'
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no tasks yet:</p>
              <span
                className={cn(
                  'text-sm bg-clip-text text-transparent',
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Create one
              </span>
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
