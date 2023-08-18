<script lang="ts">
  import { mapText } from "$lib/text"
  import type { Void } from "$lib/types"

  export let size = 8
  export let text = "onno"
  export let fill = "#000000"
  export let className: Void<string> = undefined

  $: chars = mapText(text, size)
  $: last = chars[chars.length - 1]
  $: width = last ? Math.max(last.x + last.w, 0) : 0
  $: height = Math.max(0, ...chars.map(({ h }) => h))
  $: viewBox = `0 0 ${width} ${height}`
</script>

<svg
  {fill}
  {width}
  {height}
  {viewBox}
  class={className}
  xmlns="http://www.w3.org/2000/svg"
>
  <title>{text}</title>
  {#each chars as { tag, attrs }}
    <svelte:element this={tag} {...attrs} />
  {/each}
</svg>
