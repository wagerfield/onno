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
import paths from "~/common/paths"

const MAP = {
  polygon: "points",
  path: "d"
}

export default {
  inheritAttrs: false,
  props: {
    size: {
      type: Number,
      default: 4
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
    paths() {
      return paths(this.size)
    },
    space() {
      return Math.ceil(this.size * 0.5)
    },
    chars() {
      let x = 0
      const { paths, space, size, text } = this
      return text.split("").reduce((chars, key, index) => {
        const path = paths[key]
        if (path) {
          chars.push({
            ...path,
            transform: `translate(${x})`,
            index,
            x
          })
          x += path.cols * size + space
        }
        return chars
      }, [])
    },
    width() {
      const { chars, size } = this
      const last = chars[chars.length - 1]
      return last ? Math.max(last.x + last.cols * size, 0) : 0
    },
    height() {
      return Math.max(this.size * 4, 0)
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
