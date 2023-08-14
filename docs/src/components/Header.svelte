<script lang="ts">
  import { metadata } from "$stores/metadata.store"
  import { pointer } from "$stores/pointer.store"
  import { screen } from "$stores/screen.store"
  import { theme } from "$stores/theme.store"

  import Logo from "./Logo.svelte"

  export let size = 12
</script>

<header
  class="h-screen flex items-center justify-center p-4"
  style:background={$theme.accent}
>
  <div>
    <h1><Logo {size} fill={$theme.light} /></h1>
    <p>{$metadata.description}</p>
    <p>screen: {$screen.width}px x {$screen.height}px</p>
    <p>pointer: {$pointer.x}px x {$pointer.y}px</p>
    <code>pnpm add onno</code>
    <label class="flex items-center space-x-2">
      <span>size:</span>
      <input type="range" bind:value={size} min={1} max={20} />
      <span>{size}</span>
    </label>
  </div>
</header>
