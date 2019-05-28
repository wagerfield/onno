export const PATHS = {
  // " ": "M4,0",
  // "-": "0 0 6 0 6 2 0 2",
  // "+": "2 2 2 0 4 0 4 2 6 2 6 4 4 4 4 6 2 6 2 4 0 4 0 2",
  // "=": "M0,0 L6,0 L6,2 L0,2 L0,0 Z M0,4 L6,4 L6,6 L0,6 L0,4 Z",
  // ":": "M0,4 L2,4 L2,6 L0,6 L0,4 Z M0,0 L2,0 L2,2 L0,2 L0,0 Z",
  // ".": "0 0 2 0 2 2 0 2",
  // "|": "0 0 2 0 2 8 0 8",
  // "z": "8 0 8 2 4 6 8 6 8 8 0 8 0 6 4 2 0 2 0 0",
  // "y": "2 0 2 4 4 4 4 0 8 0 8 10 7 11 2 11 2 9 4 9 4 8 1 8 0 7 0 0",
  // "x": "8 0 8 2 6 4 8 6 8 8 6 8 4 6 2 8 0 8 0 6 1.95 4.05 0 2 0 0 2 0 4 2 6 0",
  // "w": "1 8 0 7 0 0 4 0 4 4 6 4 6 0 8 0 8 4 10 4 10 0 12 0 12 7 11 8",
  // "v": "6 0 8 0 8 2 5 8 3 8 0 2 0 0 2 0 4 4",
  // "u": "6 0 8 0 8 7 7 8 1 8 0 7 0 0 4 0 4 4 6 4",
  // "t": "6 11 1 11 0 10 0 0 4 0 4 3 6 3 6 5 4 5 4 9 6 9",
  // "s": "1 5 0 4 0 1 1 0 7 0 8 1 8 2 3 2 3 3 7 3 8 4 8 7 7 8 1 8 0 7 0 6 5 6 5 5",
  // "r": "8 3 6 3 6 2 4 2 4 8 0 8 0 1 1 0 7 0 8 1",
  // "q": "M8,10 L7,11 L4,11 L4,8 L1,8 L0,7 L0,1 L1,0 L7,0 L8,1 L8,10 Z M4,6 L4,2 L2,2 L2,6 L4,6 Z",
  // "p": "M0,10 L0,1 L1,0 L7,0 L8,1 L8,7 L7,8 L4,8 L4,11 L1,11 L0,10 Z M4,6 L6,6 L6,2 L4,2 L4,6 Z",
  "o": "M0,1 L1,0 L7,0 L8,1 L8,7 L7,8 L1,8 L0,7 L0,1 Z M4,2 L4,6 L6,6 L6,2 L4,2 Z",
  "n": "6 8 6 4 4 4 4 8 0 8 0 1 1 0 7 0 8 1 8 8",
  // "m": "1 0 11 0 12 1 12 8 10 8 10 4 8 4 8 8 6 8 6 4 4 4 4 8 0 8 0 1",
  // "l": "4 0 4 10 3 11 0 11 0 1 1 0",
  // "k": "4 5 6 3 9 3 9 4 6 7 9 10 9 11 6 11 4 9 4 11 0 11 0 1 1 0 4 0",
  // "j": "6 0 6 10 5 11 0 11 0 9 2 9 2 1 3 0",
  // "i": "4 0 4 7 3 8 0 8 0 1 1 0",
  // "h": "4 3 7 3 8 4 8 11 6 11 6 7 4 7 4 11 0 11 0 1 1 0 4 0",
  // "g": "M8,10 L7,11 L2,11 L2,9 L4,9 L4,8 L1,8 L0,7 L0,1 L1,0 L7,0 L8,1 L8,10 Z M4,6 L4,2 L2,2 L2,6 L4,6 Z",
  // "f": "6 0 6 2 4 2 4 6 6 6 6 8 4 8 4 11 0 11 0 1 1 0",
  // "e": "M8,5 L4,5 L4,6 L8,6 L8,7 L7,8 L1,8 L0,7 L0,1 L1,0 L7,0 L8,1 L8,5 Z M4,2 L4,4 L6,4 L6,2 L4,2 Z",
  // "d": "M8,1 L8,10 L7,11 L1,11 L0,10 L0,4 L1,3 L4,3 L4,0 L7,0 L8,1 Z M4,5 L2,5 L2,9 L4,9 L4,5 Z",
  // "c": "8 3 6 3 6 2 4 2 4 6 6 6 6 5 8 5 8 7 7 8 1 8 0 7 0 1 1 0 7 0 8 1",
  // "b": "M0,1 L1,0 L4,0 L4,3 L7,3 L8,4 L8,10 L7,11 L1,11 L0,10 L0,1 Z M4,5 L4,9 L6,9 L6,5 L4,5 Z",
  // "a": "M0,1 L1,0 L7,0 L8,1 L8,8 L1,8 L0,7 L0,1 Z M2,2 L2,6 L4,6 L4,2 L2,2 Z",
}

export const KEYS = Object.keys(PATHS)

const ESCAPE = /[\.\+\-]/g

const STRING = KEYS.join("").replace(ESCAPE, "\\$&")

export const REGEX = new RegExp(`[^${STRING}]`)

export default PATHS