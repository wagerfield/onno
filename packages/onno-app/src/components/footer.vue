<template>
  <footer>
    <div class="inputs">
      <v-input
        label="Size"
        :value="size"
        @input="$emit('update:size', $event)"
        @keydown="setSizeStep"
        type="number"
        min="1"
        :step="sizeStep"
        :validator="validateSize"
      />
      <v-input
        label="Text"
        :value="text"
        @input="$emit('update:text', $event)"
        :validator="validateText"
      />
      <v-input label="Color" :value="color" @input="$emit('update:color', $event)"/>
      <v-input label="Background" :value="background" @input="$emit('update:background', $event)"/>
    </div>
    <v-button @click="$emit('download', $event)" tag="a" tabindex="0">Download Logo</v-button>
  </footer>
</template>

<script>
import { REGEX } from "~/common/chars"
import props from "~/common/props"
import VButton from "./button"
import VInput from "./input"

export default {
  props,
  data() {
    return {
      sizeStep: 1
    }
  },
  components: {
    VButton,
    VInput
  },
  methods: {
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
  background: #24292e;
  padding: 16px;
}
.inputs {
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-column-gap: 24px;
  grid-row-gap: 16px;
  margin-right: 16px;
  justify-items: end;
}
</style>
