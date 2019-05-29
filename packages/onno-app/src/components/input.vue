<template>
  <div class="input-group" :class="classes">
    <label v-if="label" v-text="label" :for="id" :style="style(white)"/>
    <input
      v-bind="$attrs"
      v-on="listeners"
      :id="id"
      :type="type"
      :value="value"
      :style="style(black, white)"
    >
  </div>
</template>

<script>
import props from "~/core/props"
import style from "~/core/utils"

export default {
  inheritAttrs: false,
  props: {
    white: props.white,
    black: props.black,
    brand: props.brand,
    value: {
      type: [Number, String],
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    validator: {
      type: Function
    }
  },
  computed: {
    isValid() {
      return this.validator ? this.validator(this.value) : null
    },
    isNumber() {
      return this.type === "number"
    },
    classes() {
      let valid = null
      if (this.isValid === true) valid = "valid"
      if (this.isValid === false) valid = "invalid"
      return [valid]
    },
    listeners() {
      const vm = this
      return {
        ...this.$listeners,
        input(event) {
          let value = event.target.value
          if (vm.isNumber) value = +value
          vm.$emit("input", value)
        }
      }
    }
  },
  methods: {
    style
  }
}
</script>

<style>
.input-group {
  width: 180px;
  display: flex;
  justify-content: flex-end;
}
label,
input {
  padding: 0 12px;
}
label {
  opacity: 0.5;
  flex: 1 0 auto;
  font-size: 14px;
  font-family: Monaco, monospace;
  text-transform: uppercase;
  text-align: right;
  line-height: 32px;
  padding-left: 0;
  cursor: pointer;
}
input {
  opacity: 0.5;
  flex: 0 0 auto;
  box-sizing: border-box;
  font-family: Monaco, monospace;
  font-size: 14px;
  line-height: 1;
  height: 32px;
  width: 120px;
  border: 0;
}
input[type="number"] {
  padding-right: 6px;
}
input:focus {
  outline: 3px solid #59d;
  outline-offset: 0;
}
input:hover,
input:focus {
  opacity: 1;
}
.input-group.valid input:focus {
  outline: 3px solid #4c8;
}
.input-group.invalid input:focus {
  outline: 3px solid #e55;
}
</style>
