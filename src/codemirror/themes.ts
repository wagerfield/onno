import { tags } from "@lezer/highlight"
import { oneDark } from "@codemirror/theme-one-dark"
import { createTheme, type EditorTheme } from "./utils"

const baseEditorTheme: EditorTheme = {
  focusedOutline: "1px solid #000",

  // Typography
  fontFamily: "JetBrains Mono Variable",
  fontSize: "15px",
  lineHeight: "20px",

  // Cursor
  cursorWidth: 2,

  // Padding
  contentPadding: "0.5em 0",
  gutterPadding: "0 2em",
  linePadding: "0",

  // Gutter
  gutterBorder: "none",
  gutterMinWidth: "0",
}

const themes = {
  light: createTheme({
    dark: false,
    editor: {
      ...baseEditorTheme,
      background: "#fff",
      textColor: "#111827",
      cursorColor: "#111827",
      gutterBackground: "#fffd",
      gutterBackdropFilter: "blur(4px)",
      gutterTextColor: "#9ca3af",
      activeGutterBackground: "none",
      activeGutterTextColor: "#111827",
      activeLineBackground: "#cbd5e144",
      selectionBackground: "#cbd5e144",
      focusedSelectionBackground: "#cbd5e144",
      matchingBracketBackground: "#cbd5e1aa",
      hoverGutterTextColor: "#111827",
    },
    syntax: [
      { tag: tags.comment, color: "#9ca3af" },
      { tag: tags.keyword, color: "#e11d48" },
      { tag: tags.variableName, color: "#7c3aed" },
      { tag: tags.string, color: "#2563eb" },
      { tag: tags.bool, color: "#10b981" },
      { tag: tags.function(tags.variableName), color: "#f97316" },
    ],
  }),
  dark: [
    oneDark,
    createTheme({
      dark: true,
      editor: { ...baseEditorTheme, cursorColor: "#528bff" },
      syntax: [],
    }),
  ],
}

export type CodeMirrorThemeName = keyof typeof themes

export const getTheme = (theme: CodeMirrorThemeName) => themes[theme]
