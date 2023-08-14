<script lang="ts">
  import { metadata } from "$stores/metadata.store"

  $: theme = [
    ["light", $metadata.themeLight],
    ["dark", $metadata.themeDark],
  ]
</script>

<svelte:head>
  <title>{$metadata.title}</title>

  <meta name="application-name" content={$metadata.title} />
  <meta name="description" content={$metadata.description} />
  <meta name="viewport" content={$metadata.viewport} />

  <!-- Apple -->
  <meta name="apple-mobile-web-app-title" content={$metadata.title} />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content={$metadata.statusBarStyle}
  />

  <!-- Open Graph -->
  <meta name="og:title" content={$metadata.title} />
  <meta name="og:site_name" content={$metadata.title} />
  <meta name="og:description" content={$metadata.description} />
  <meta name="og:type" content="website" />
  <meta name="og:url" content={$metadata.url} />
  <meta name="og:image" content="{$metadata.url}/og.png" />

  <!-- Theme -->
  {#each theme as [key, color] (key)}
    <meta
      name="theme-color"
      media="(prefers-color-scheme: {key})"
      content={color}
    />
  {/each}
</svelte:head>
