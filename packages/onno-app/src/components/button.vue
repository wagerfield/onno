<template>
  <component class="button" :is="tag" :style="style(black, white)" v-on="$listeners">
    <slot/>
  </component>
</template>

<script>
import props from "~/core/props"
import style from "~/core/utils"

export default {
  props: {
    white: props.white,
    black: props.black,
    brand: props.brand,
    tag: {
      type: String,
      default: "button"
    }
  },
  methods: {
    style
  }
}
</script>

<style>
.button {
  opacity: 0.5;
  box-sizing: border-box;
  text-transform: uppercase;
  font-family: Monaco, monospace;
  font-size: 14px;
  font-weight: bold;
  line-height: 32px;
  text-decoration: none;
  padding: 0 16px;
  cursor: pointer;
  height: 32px;
  border: 0;
}
.button:hover,
.button:focus {
  opacity: 1;
}
.button:focus {
  outline: 3px solid #59d;
}
</style>
