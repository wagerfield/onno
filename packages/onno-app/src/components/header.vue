<template>
  <header :style="style(black, brand)">
    <v-logo v-bind="logo"/>
    <p>Responsive style props for building themed design systems</p>
    <div class="callouts">
      <a :style="style(white, black)" :href="docs">Documentation</a>
      <code :style="style(black, white)">yarn add onno</code>
    </div>
  </header>
</template>

<script>
import props from "~/core/props"
import style from "~/core/utils"
import VLogo from "./logo"

export default {
  props: {
    ...props,
    docs: {
      type: String,
      required: true
    }
  },
  components: {
    VLogo
  },
  computed: {
    logo() {
      return {
        size: this.size,
        text: this.text,
        fill: this.white
      }
    }
  },
  methods: {
    style
  }
}
</script>

<style>
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
}
header p {
  font-size: 1.5rem;
  max-width: 28ch;
  margin: 2em 0;
}
.callouts {
  display: flex;
}
.callouts a,
.callouts code {
  box-sizing: border-box;
  font-family: Monaco, monospace;
  text-align: center;
  min-width: 180px;
  padding: 12px;
}
.callouts code {
  margin-left: 16px;
}
</style>
