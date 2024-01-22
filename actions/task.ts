'use server'

import prisma from '@/lib/db'
import { createTaskSchemaType } from '@/lib/types'
import { currentUser } from '@clerk/nextjs'

export const createTask = async (data: createTaskSchemaType) => {
  const user = await currentUser()
  if (!user) {
    throw new Error('user not found')
  }

  const { content, expiresAt, collectionId } = data
  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  })
}

export const setTaskToDone = async (id: number) => {
  const user = await currentUser()
  if (!user) {
    throw new Error('User not found')
  }

  return await prisma.task.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      done: true,
    },
  })
}
