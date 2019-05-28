<template>
  <component class="button" :is="tag" v-on="$listeners">
    <slot/>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "button"
    }
  }
}
</script>

<style>
.button {
  box-sizing: border-box;
  text-transform: uppercase;
  font-family: Monaco, monospace;
  font-size: 14px;
  font-weight: bold;
  line-height: 32px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.5);
  color: #24292e;
  padding: 0 16px;
  cursor: pointer;
  height: 32px;
  border: 0;
}
.button:hover,
.button:focus {
  background: #fff;
}
.button:focus {
  outline: 3px solid #59d;
}
</style>
