<template>
  <header :style="{ background }">
    <v-logo v-bind="$props"/>
    <p>Responsive style props for building themed design systems</p>
    <div class="callouts">
      <a href="https://github.com/wagerfield/onno/tree/master/docs">Documentation</a>
      <code>yarn add onno</code>
    </div>
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
.callouts {
  display: flex;
}
.callouts a,
.callouts code {
  font-family: Monaco, monospace;
  text-align: center;
  min-width: 180px;
  padding: 1em 0;
}
.callouts a {
  color: #fff;
  background: #24292e;
  text-decoration: none;
}
.callouts a:hover {
  color: #24292e;
  background: #fff;
}
.callouts code {
  background: #fff;
  margin-left: 16px;
}
</style>
