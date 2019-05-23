<template>
  <div class="input-group" :class="classes">
    <label v-text="label"/>
    <input v-bind="$attrs" v-on="listeners" :value="value" :type="type">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String]
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
  }
}
</script>

<style>
.input-group {
  display: flex;
  align-items: center;
}
label {
  font-family: Monaco, monospace;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}
input {
  box-sizing: border-box;
  font-family: Monaco, monospace;
  font-size: 14px;
  line-height: 1;
  background: rgba(255, 255, 255, 0.5);
  color: #24292e;
  margin-left: 12px;
  padding: 0 12px;
  height: 32px;
  width: 120px;
  border: 0;
}
input[type="number"] {
  padding-right: 6px;
}
input:focus {
  background: #fff;
  outline: 3px solid #59d;
  outline-offset: 0;
}
input:hover {
  background: #fff;
}
.input-group.valid input:focus {
  outline: 3px solid #4c8;
}
.input-group.invalid input:focus {
  outline: 3px solid #e55;
}
</style>
