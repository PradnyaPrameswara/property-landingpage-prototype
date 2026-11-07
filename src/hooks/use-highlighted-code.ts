import * as React from "react"
import { loadHighlighter } from "@/lib/highlighter"

type Highlighter = Awaited<ReturnType<typeof loadHighlighter>>
type State = { highlighter: Highlighter | null; requested: boolean; subscribers: Set<() => void> }
const states = new Map<string, State>()
function stateFor(language: string): State {
  let current = states.get(language)
  if (!current) {
    current = { highlighter: null, requested: false, subscribers: new Set() }
    states.set(language, current)
  }
  return current
}

export function useHighlightedCode(value: string, language: string): React.ReactNode[] {
  const subscribe = React.useCallback((listener: () => void) => {
    const state = stateFor(language)
    state.subscribers.add(listener)
    if (!state.requested) {
      state.requested = true
      void loadHighlighter(language).then((highlighter) => {
        state.highlighter = highlighter
        state.subscribers.forEach((callback) => callback())
      }).catch(() => {
        state.requested = false
      })
    }
    return () => { state.subscribers.delete(listener) }
  }, [language])
  const snapshot = React.useCallback(() => stateFor(language).highlighter, [language])
  const highlighter = React.useSyncExternalStore(subscribe, snapshot, () => null)
  return React.useMemo(() => {
    const code = value.endsWith("\n") ? value.slice(0, -1) : value
    if (!highlighter) return code.split("\n")
    return highlighter.highlight(code).lines
  }, [value, highlighter])
}
