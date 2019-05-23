<template>
  <header :style="{ background }">
    <v-logo v-bind="$props"/>
    <p>Responsive style props for building themed design systems.</p>
    <code>yarn add onno</code>
  </header>
</template>

<script>
import props from "~/common/props"
import VLogo from "./logo"

export default {
  props,
  components: {
    VLogo
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
}
header p {
  font-size: 1.5rem;
  max-width: 28ch;
  margin: 2em 0;
}
header code {
  background: rgba(255, 255, 255, 0.2);
  padding: 1em 2em;
}
</style>
