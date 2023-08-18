import type { Extension } from "@codemirror/state"

import { EditorView } from "@codemirror/view"

export type StyleSpec = {
  [key: string]: StyleSpec | string | number | null
}

export interface CodeMirrorTheme {
  [selector: string]: StyleSpec
}

const lightTheme: CodeMirrorTheme = {
  "&": {
    background: "#FFF",
    color: "#000",
  },
  ".cm-scroller": {
    fontFamily: "JetBrains Mono Variable",
    fontSize: "15px",
    lineHeight: 1.2,
  },
  ".cm-content": {
    caretColor: "#F00",
    padding: "8px 0",
  },

  // Gutter
  ".cm-gutters": {
    background: "#FFF",
    color: "#BBB",
    border: "none",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 16px",
  },

  // Lines
  ".cm-line": {
    padding: 0,
  },
  ".cm-activeLine": {
    background: "#00000010",
  },
  ".cm-activeLineGutter": {
    background: "none",
    color: "#000",
  },

  // Cursor
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#F00",
    borderLeftWidth: "2px",
  },

  // Selection
  ".cm-selectionBackground": {
    background: "#F00",
  },
  "&.cm-focused .cm-scroller .cm-selectionLayer .cm-selectionBackground": {
    background: "#0F0",
  },
}

const darkTheme: CodeMirrorTheme = {}

export function getTheme(dark: boolean): Extension {
  return EditorView.theme(dark ? darkTheme : lightTheme, { dark })
}
