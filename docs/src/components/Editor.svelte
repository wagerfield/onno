<script lang="ts" context="module">
  export type VoidString = string | undefined

  export interface EditorEvent {
    change: string
  }
</script>

<script lang="ts">
  import { basicSetup, EditorView } from "codemirror"
  import { EditorState, StateEffect, type Extension } from "@codemirror/state"
  import { javascript } from "@codemirror/lang-javascript"
  import { createEventDispatcher, onMount } from "svelte"

  export let id: VoidString = undefined
  export let value: VoidString = undefined
  export let className: VoidString = undefined
  export let language = javascript({ typescript: true })
  export let extensions: Extension[] = []

  const dispatch = createEventDispatcher<EditorEvent>()

  let element: HTMLDivElement
  let view: EditorView

  $: stateExtensions = [basicSetup, language, ...extensions]

  $: if (view) {
    view.dispatch({
      effects: StateEffect.reconfigure.of(stateExtensions),
    })
  }

  $: if (view && !view.hasFocus) {
    EditorState.create({
      extensions: stateExtensions,
      doc: value,
    })
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: value,
      },
    })
  }

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
