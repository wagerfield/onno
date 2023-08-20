<script lang="ts" context="module">
  export interface EditorEvent {
    change: string
  }
</script>

<script lang="ts">
  import type { Void } from "$lib/types"
  import type { Extension } from "@codemirror/state"

  import { EditorView } from "@codemirror/view"
  import { javascript } from "@codemirror/lang-javascript"
  import { createEventDispatcher, onMount } from "svelte"
  import { getExtensions } from "$codemirror/extensions"

  export let id: Void<string> = undefined
  export let value: Void<string> = undefined
  export let className: Void<string> = undefined

  export let language = javascript({ typescript: true })
  export let extensions: Extension = []

  const dispatch = createEventDispatcher<EditorEvent>()

  let element: HTMLDivElement
  let view: EditorView

  $: stateExtensions = getExtensions({
    extensions: [language, extensions],
    theme: "light",
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

<div {id} bind:this={element} class={className} />
