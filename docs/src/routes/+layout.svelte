<script lang="ts">
  import "../app.css"

  import "@fontsource-variable/inter"
  import "@fontsource-variable/jetbrains-mono"

  import Head from "$components/Head.svelte"
  import Header from "$components/Header.svelte"
  import Footer from "$components/Footer.svelte"

  import { theme } from "$stores/theme.store"
</script>

<Head />
<Header />
<main class="p-4" style:background={$theme.light} style:color={$theme.dark}>
  <slot />
</main>
<Footer />
