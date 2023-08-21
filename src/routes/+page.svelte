<script lang="ts">
  import basicExample from "$examples/basic.example"

  import Editor from "$components/Editor.svelte"
  import Logo from "$components/Logo.svelte"

  let value = basicExample

  $: rows = value.split("\n").length
</script>

<main class="grid gap-4 p-4 lg:grid-cols-2">
  <Logo fill="#111827" className="lg:col-span-2" />
  <Editor id="editor-1" bind:value className="border" theme="light" />
  <Editor id="editor-2" bind:value className="border" theme="dark" />
  <textarea
    bind:value
    cols="100"
    {rows}
    class="border whitespace-nowrap overflow-auto focus:outline-none"
  />
  <pre class="border overflow-auto">{value}</pre>
</main>
