import * as React from "react"
import { cn } from "cn"
import {
  Combobox as Command, ComboboxInput as CommandInput, ComboboxList as CommandList,
  ComboboxItem as CommandItem, ComboboxGroup as CommandGroup,
  ComboboxLabel as CommandGroupHeading, ComboboxEmpty as CommandEmpty,
  ComboboxSeparator as CommandSeparator,
} from "./combobox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, ...props }:
  Omit<React.ComponentProps<typeof Dialog>, "children"> & { children?: React.ReactNode; title?: string; description?: string; className?: string }) {
  return <Dialog {...props}><DialogHeader className="sr-only"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><DialogContent className={cn("top-1/3 translate-y-0 overflow-hidden p-0", className)}>{children}</DialogContent></Dialog>
}
function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}
export { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandGroupHeading, CommandEmpty, CommandSeparator, CommandDialog, CommandShortcut }
