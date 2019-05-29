<template>
  <footer :style="style(white, black)">
    <div class="inputs">
      <v-input
        v-on="inputEvent('size')"
        v-bind="inputProps('size')"
        @keydown="setSizeStep"
        :validator="validateSize"
        :step="sizeStep"
        type="number"
        min="1"
      />
      <!-- <v-input
        v-on="inputEvent('text')"
        v-bind="inputProps('text')"
        :validator="validateText"
      />-->
      <v-input
        v-for="color in colorKeys"
        v-bind="inputProps(color)"
        v-on="inputEvent(color)"
        :key="color"
      />
    </div>
    <v-button v-bind="colors" @click="$emit('download', $event)" tag="a" tabindex="0">Download Logo</v-button>
  </footer>
</template>

<script>
import { REGEX } from "~/core/chars"
import { colors, style } from "~/core/utils"
import props from "~/core/props"
import VButton from "./button"
import VInput from "./input"

export default {
  props,
  data() {
    return {
      colorKeys: ["white", "black", "brand"],
      sizeStep: 1
    }
  },
  components: {
    VButton,
    VInput
  },
  computed: {
    colors
  },
  methods: {
    style,
    inputProps(key) {
      return {
        id: key,
        label: key,
        value: this[key],
        ...this.colors
      }
    },
    inputEvent(key) {
      const vm = this
      const event = `update:${key}`
      return { input: (value) => vm.$emit(event, value) }
    },
    setSizeStep({ altKey, shiftKey }) {
      this.sizeStep = altKey ? 0.5 : shiftKey ? 10 : 1
    },
    validateSize(value) {
      return value >= 1 && value % 0.5 === 0
    },
    validateText(value) {
      return !REGEX.test(value)
    }
  }
}
</script>

<style>
footer {
  display: flex;
  user-select: none;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px;
}
.inputs {
  display: grid;
  flex: 1 0 auto;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-column-gap: 20px;
  grid-row-gap: 16px;
  margin-right: 16px;
  justify-items: end;
}
</style>
