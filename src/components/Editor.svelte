<script lang="ts" context="module">
  export interface EditorEvent {
    change: string
  }
</script>

<script lang="ts">
  import type { Void } from "$lib/types"
  import type { Extension } from "@codemirror/state"
  import type { CodeMirrorThemeName } from "$codemirror/themes"

  import { EditorView } from "@codemirror/view"
  import { javascript } from "@codemirror/lang-javascript"
  import { createEventDispatcher, onMount } from "svelte"
  import { getExtensions } from "$codemirror/extensions"
  import { clsx } from "onno"

  export let id: Void<string> = undefined
  export let value: Void<string> = undefined
  export let className: Void<string> = undefined

  export let theme: CodeMirrorThemeName = "light"
  export let language = javascript({ typescript: true })
  export let extensions: Extension = []

  const dispatch = createEventDispatcher<EditorEvent>()

  let element: HTMLDivElement
  let view: EditorView

  $: classes = clsx("overflow-hidden", className)
  $: stateExtensions = getExtensions({
    extensions: [language, extensions],
    theme: theme,
  })

  onMount(() => {
    view = new EditorView({
      doc: value,
      parent: element,
      extensions: stateExtensions,
      dispatch(transaction, view) {
        view.update([transaction])

        if (transaction.docChanged) {
          value = view.state.doc.toString()

          dispatch("change", value)
        }
      },
    })

    return () => view.destroy()
  })
</script>

<div {id} bind:this={element} class={classes} />
