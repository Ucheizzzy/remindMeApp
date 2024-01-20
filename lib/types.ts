import { z } from 'zod'
import { CollectionColors } from './constants'
export const createCollectionSchema = z.object({
  name: z.string().min(4, {
    message: 'collection name must be at least 4 characters',
  }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionColors).includes(color)),
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>

export const createTaskSchema = z.object({
  collectionId: z.number().nonnegative(),
  content: z.string().min(8, {
    message: 'Task content must be at least 8 character',
  }),
  expiresAt: z.date().optional(),
})
export type createTaskSchemaType = z.infer<typeof createTaskSchema>
