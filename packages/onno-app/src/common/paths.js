export default (size) => {
  const z0 = 0
  const u1 = size
  const u2 = u1 * 2
  const u3 = u1 * 3
  const u4 = u1 * 4
  const c1 = Math.ceil(size * 0.5)
  const c2 = u4 - c1
  return {
    " ": {
      tag: "path",
      cols: 2,
      rows: 4,
      path: null
    },
    "+": {
      tag: "polygon",
      cols: 3,
      rows: 4,
      path: [
        z0,
        u2,
        u1,
        u2,
        u1,
        u1,
        u2,
        u1,
        u2,
        u2,
        u3,
        u2,
        u3,
        u3,
        u2,
        u3,
        u2,
        u4,
        u1,
        u4,
        u1,
        u3,
        z0,
        u3
      ].join(" ")
    },
    "-": {
      tag: "polygon",
      cols: 3,
      rows: 4,
      path: [z0, u2, u3, u2, u3, u3, z0, u3].join(" ")
    },
    "|": {
      tag: "polygon",
      cols: 1,
      rows: 4,
      path: [z0, z0, u1, z0, u1, u4, z0, u4].join(" ")
    },
    ":": {
      tag: "path",
      cols: 1,
      rows: 4,
      path: [
        `M${z0},${u1}`,
        `L${u1},${u1}`,
        `L${u1},${u2}`,
        `L${z0},${u2}`,
        `Z`,
        `M${z0},${u3}`,
        `L${u1},${u3}`,
        `L${u1},${u4}`,
        `L${z0},${u4}`,
        `Z`
      ].join(" ")
    },
    ".": {
      tag: "path",
      cols: 1,
      rows: 4,
      path: [
        `M${z0},${u3}`,
        `L${u1},${u3}`,
        `L${u1},${u4}`,
        `L${z0},${u4}`,
        `Z`
      ].join(" ")
    },
    o: {
      tag: "path",
      cols: 4,
      rows: 4,
      path: [
        `M${z0},${c1}`,
        `L${c1},${z0}`,
        `L${c2},${z0}`,
        `L${u4},${c1}`,
        `L${u4},${c2}`,
        `L${c2},${u4}`,
        `L${c1},${u4}`,
        `L${z0},${c2}`,
        `Z`,
        `M${u2},${u1}`,
        `L${u2},${u3}`,
        `L${u3},${u3}`,
        `L${u3},${u1}`,
        `Z`
      ].join(" ")
    },
    n: {
      tag: "polygon",
      cols: 4,
      rows: 4,
      path: [
        z0,
        c1,
        c1,
        z0,
        c2,
        z0,
        u4,
        c1,
        u4,
        u4,
        u3,
        u4,
        u3,
        u2,
        u2,
        u2,
        u2,
        u4,
        z0,
        u4
      ].join(" ")
    }
  }
}
