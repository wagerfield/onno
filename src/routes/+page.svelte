<script lang="ts">
  import basicExample from "$examples/basic.example"

  import Editor from "$components/Editor.svelte"
  import Logo from "$components/Logo.svelte"

  let value = basicExample
</script>

<main class="grid grid-cols-2 gap-4 p-4">
  <Logo className="col-span-2" />
  <Editor id="editor-1" bind:value className="border" />
  <Editor id="editor-2" bind:value className="border" />
  <textarea bind:value cols="100" rows="12" class="border focus:outline-none" />
  <pre class="border">{value}</pre>
</main>
