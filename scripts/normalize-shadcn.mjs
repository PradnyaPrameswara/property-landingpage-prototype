import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const ui = 'src/components/ui/';
function patch(path, transform) {
  const s = readFileSync(path, 'utf8');
  const next = transform(s);
  if (next === s) throw new Error('Generated registry source changed: ' + path);
  writeFileSync(path, next);
}
function replace(s, oldValue, newValue) {
  if (!s.includes(oldValue)) throw new Error('Expected snippet missing: ' + oldValue.slice(0, 60));
  return s.replace(oldValue, newValue);
}
function replaceRegex(s, regex, next) {
  if (!regex.test(s)) throw new Error('Expected regex did not match: ' + regex);
  return s.replace(regex, next);
}
patch(ui + 'button.tsx', s => replace(replace(s, '      variant: {', '      variant: {\n        proformaCta: "cta-round-btn",'), '      size: {', '      size: {\n        proforma: "",'));
patch(ui + 'sidebar.tsx', s => {
  s = replaceRegex(s, /  \/\/ Adds a keyboard shortcut to toggle the sidebar\.[\s\S]*?\}, \[toggleSidebar\]\)/, `  const shortcutRef = React.useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggleSidebar])`);
  return replace(s, '        data-slot="sidebar-wrapper"', '        data-slot="sidebar-wrapper"\n        ref={shortcutRef}');
});
patch(ui + 'calendar.tsx', s => {
  s = replaceRegex(s, /  const ref = React\.useRef<HTMLButtonElement>\(null\)[\s\S]*?\}, \[modifiers\.focused\]\)/, `  const focusedDayRef = React.useCallback((node: HTMLButtonElement | null) => {
    if (node && modifiers.focused) node.focus()
  }, [modifiers.focused])`);
  return replace(s, '      {...props}\n    />\n  )\n}\n\nexport { Calendar, CalendarDayButton }', '      {...props}\n      ref={focusedDayRef}\n    />\n  )\n}\n\nexport { Calendar, CalendarDayButton }');
});
patch(ui + 'carousel.tsx', s => {
  s = replaceRegex(s, /  React\.useEffect\(\(\) => \{[\s\S]*?\}, \[api, onSelect\]\)/, `  const carouselRootRef = React.useCallback((node: HTMLDivElement | null) => {
    if (!node || !api) return
    setApi?.(api)
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api, onSelect, setApi])`);
  return replace(s, '        data-slot="carousel"', '        data-slot="carousel"\n        ref={carouselRootRef}');
});
patch(ui + 'code-block.tsx', s => {
  s = replaceRegex(s, /  React\.useEffect\(\(\) => \{[\s\S]*?\}, \[copied\]\)/, `  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyButtonRef = React.useCallback((node: HTMLButtonElement | null) => {
    if (node || timeoutRef.current === null) return
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }, [])
  const markCopied = React.useCallback(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    setCopied(true)
    timeoutRef.current = setTimeout(() => {
      setCopied(false)
      timeoutRef.current = null
    }, 2000)
  }, [])`);
  s = replace(s, '.then(() => setCopied(true))', '.then(markCopied)');
  return replace(s, '        {...props}\n      >\n        {copied ? (', '        {...props}\n        ref={copyButtonRef}\n      >\n        {copied ? (');
});
writeFileSync(ui + 'command.tsx', `import * as React from "react"
import { cn } from "cn"
import {
  Combobox as Command, ComboboxInput as CommandInput, ComboboxList as CommandList,
  ComboboxItem as CommandItem, ComboboxGroup as CommandGroup,
  ComboboxLabel as CommandGroupHeading, ComboboxEmpty as CommandEmpty,
  ComboboxSeparator as CommandSeparator,
} from "./combobox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, ...props }:
  React.ComponentProps<typeof Dialog> & { title?: string; description?: string; className?: string }) {
  return <Dialog {...props}><DialogHeader className="sr-only"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader><DialogContent className={cn("top-1/3 translate-y-0 overflow-hidden p-0", className)}>{children}</DialogContent></Dialog>
}
function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
}
export { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandGroupHeading, CommandEmpty, CommandSeparator, CommandDialog, CommandShortcut }
`);
mkdirSync('src/hooks', {recursive:true});
writeFileSync('src/hooks/use-mobile.ts', `import * as React from "react"
const breakpoint = 768
function subscribe(callback: () => void) {
  const query = window.matchMedia("(max-width: " + (breakpoint - 1) + "px)")
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}
function getSnapshot() { return window.matchMedia("(max-width: " + (breakpoint - 1) + "px)").matches }
function getServerSnapshot() { return false }
export function useIsMobile() { return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) }
`);
patch('src/components/islands/NewsletterForm.tsx', s => {
  s = replace(s, "import type { FormEvent } from 'react';", "import type { SyntheticEvent } from 'react';");
  s = replace(s, "import { TextField } from '../ui/input';", "import { Input } from '../ui/input';");
  s = replace(s, "import { Arrow } from '../ui/card';", `function Arrow({ label }: { label: string }) {
  return <span className="arrow" aria-label={label} role="img"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.5 11L6.5 6L1.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}`);
  s = replace(s, 'FormEvent<HTMLFormElement>', 'SyntheticEvent<HTMLFormElement>');
  s = replace(s, '<TextField', '<Input className="text-field"');
  return replace(s, '<Button variant="cta"', '<Button variant="proformaCta" size="proforma"');
});
console.log('Official shadcn components adapted to Base UI without effects or Radix dependencies.');
