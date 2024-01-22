import { useForm } from 'react-hook-form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { createCollectionSchema, createCollectionSchemaType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { createCollection } from '@/actions/collection'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'

type Props = {
  open: boolean
  handleOpenChange: (open: boolean) => void
}
export default function CreateCollectionSheet({
  open,
  handleOpenChange,
}: Props) {
  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      name: '',
      color: '',
    },
  })
  const { refresh } = useRouter()
  const onSubmit = async (data: createCollectionSchemaType) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    try {
      await createCollection(data)

      //close the sheet
      handleOpenChangeWrapper(false)
      refresh()

      toast({
        title: 'Success',
        description: 'Collection created successfully',
      })
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later',
        variant: 'destructive',
      })
      console.log('Error while creating collection', error)
    }
  }

  const handleOpenChangeWrapper = (open: boolean) => {
    form.reset()
    handleOpenChange(open)
  }
  return (
    <Sheet open={open} onOpenChange={handleOpenChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Collection </SheetTitle>
          <SheetDescription>
            Collections are ways to group and organize your tasks
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className='space-y-4 flex flex-col'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Personal' {...field} />
                  </FormControl>
                  <FormDescription>Collection name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          'w-full h-8 text-white',
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder='Color'
                          className='w-full h-8'
                        />
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex flex-col gap-3 mt-4'>
          <Separator />
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            variant='outline'
            className={cn(
              form.watch('color') &&
                CollectionColors[form.getValues('color') as CollectionColor]
            )}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
