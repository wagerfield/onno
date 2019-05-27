<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="viewBox">
    <g :fill="color">
      <component
        v-for="char in chars"
        v-if="char.path"
        v-bind="attrs(char)"
        :key="char.index"
        :is="char.tag"
      ></component>
    </g>
  </svg>
</template>

<script>
import chars from "~/common/chars"

const NUM = /\d/g
const MAP = {
  polygon: "points",
  path: "d"
}

const getProps = (path, size, x, y) => {
  const tag = isNaN(path[0]) ? "path" : "polygon"
  const scale = (v) => Math[v < 4 ? "ceil" : "floor"](v * size)
  return path.split(" ").reduce(
    (props, value, index, array) => {
      const match = value.match(NUM)
      if (tag === "path" && match) {
        props.w = Math.max(props.w, scale(match[0]))
        props.h = Math.max(props.h, scale(match[1]))
      } else if (tag === "polygon" && index % 2) {
        props.w = Math.max(props.w, scale(array[index - 1]))
        props.h = Math.max(props.h, scale(value))
      }
      return props
    },
    {
      tag,
      path: path.replace(NUM, scale),
      transform: `translate(${x})`,
      w: 0,
      h: 0,
      x,
      y
    }
  )
}

export default {
  inheritAttrs: false,
  props: {
    size: {
      type: Number,
      default: 2
    },
    text: {
      type: String,
      default: "onno"
    },
    color: {
      type: String,
      default: "#000"
    }
  },
  computed: {
    chars() {
      let x = 0
      const { size, text } = this
      return text.split("").reduce((arr, key, index) => {
        const path = chars[key]
        if (path) {
          const props = getProps(path, size, x, 0)
          arr.push(Object.assign({ index }, props))
          x += props.w + Math.ceil(size)
        }
        return arr
      }, [])
    },
    width() {
      const last = this.chars[this.chars.length - 1]
      return last ? Math.max(last.x + last.w, 0) : 0
    },
    height() {
      return Math.max(this.size * 8, 0)
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    }
  },
  methods: {
    attrs({ path, tag, transform }) {
      return { [MAP[tag]]: path, transform }
    }
  }
}
</script>

<style>
svg {
  display: block;
  flex: 0 0 auto;
}
</style>
