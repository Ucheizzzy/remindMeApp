'use server'

import prisma from '@/lib/db'
import { createCollectionSchemaType } from '@/lib/types'
import { currentUser } from '@clerk/nextjs'

export async function createCollection(form: createCollectionSchemaType) {
  const user = await currentUser()

  if (!user) {
    throw new Error('user not found')
  }

  return await prisma.collection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  })
}
