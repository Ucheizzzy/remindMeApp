import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

type Props = {
  open: boolean
  handleOpenChange: (open: boolean) => void
}
export default function CreateCollectionSheet({
  open,
  handleOpenChange,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Collection </SheetTitle>
          <SheetDescription>
            Collections are ways to group and organize your tasks
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
