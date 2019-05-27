<template>
  <main>
    <v-header v-bind.sync="$data"/>
    <v-footer v-bind.sync="$data" @download="download"/>
  </main>
</template>

<script>
import VHeader from "~/components/header"
import VFooter from "~/components/footer"

export default {
  data() {
    return {
      size: 16,
      text: "onno",
      color: "ivory",
      background: "tomato"
    }
  },
  components: {
    VHeader,
    VFooter
  },
  methods: {
    download({ target }) {
      const svg = document.querySelector("svg")
      const data = svg.outerHTML.replace(/<!-+>/g, "")
      const blob = new Blob([data], { type: "image/svg+xml" })
      target.href = window.URL.createObjectURL(blob)
      target.download = "onno.svg"
      target.target = "_blank"
    }
  }
}
</script>

<style>
html {
  font-family: system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.4;
  color: #24292e;
}
body {
  margin: 0;
}
main {
  display: grid;
  min-height: 100vh;
  grid-template-rows: 1fr auto;
}
code {
  font-family: Monaco, monospace;
}
</style>
