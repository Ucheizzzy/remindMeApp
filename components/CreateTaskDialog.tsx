import { createTaskSchema, createTaskSchemaType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Collection } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { cn } from '@/lib/utils'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Textarea } from './ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons'
import { createTask } from '@/actions/task'
import { toast } from './ui/use-toast'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  collection: Collection
}
export default function CreateTaskDialog({ open, setOpen, collection }: Props) {
  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
      content: '',
    },
  })
  const { refresh } = useRouter()
  const openChangeWrapper = (value: boolean) => {
    setOpen(value)
    form.reset()
  }

  const onSubmit = async (data: createTaskSchemaType) => {
    try {
      await createTask(data)
      toast({
        title: 'Success',
        description: 'Task created successfully.',
      })

      openChangeWrapper(false)
      refresh()
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: 'Cannot create task',
        variant: 'destructive',
      })
    }
  }
  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex capitalize gap-2'>
            Add Task to collection
            <span
              className={cn(
                'p-[1px] bg-clip-text text-transparent',
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collections. You can add as many task as you want
            to a collection
          </DialogDescription>
        </DialogHeader>
        <div className='gap-4 py-4'>
          <Form {...form}>
            <form
              className='space-y-4 flex flex-col'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder='Task content here'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='expiresAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='capitalize'>Expires at</FormLabel>
                    <FormDescription className='capitalize'>
                      When should this task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'justify-start text-left font-normal w-full',
                              !field.value && <span>No Expiration Date</span>
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value && format(field.value, 'PPP')}
                            {!field.value && <span>No Expiration Date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              'w-full dark:text-white text-white',
              CollectionColors[collection.color as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className='animate-spin h-4 w-4 ml-2' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
