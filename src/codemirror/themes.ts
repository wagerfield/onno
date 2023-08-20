import { createTheme, type EditorTheme } from "./utils"

const baseEditorTheme: EditorTheme = {
  focusedOutline: "1px solid #000",

  // Typography
  fontFamily: "JetBrains Mono Variable",
  fontSize: "15px",
  lineHeight: 1.2,

  // Cursor
  cursorWidth: 2,

  // Padding
  contentPadding: "0.6em 0",
  gutterPadding: "0 1em",
  linePadding: "0",

  // Gutter
  gutterBorder: "none",
  gutterMinWidth: "0",
  gutterBackground: "none",
  activeGutterBackground: "none",
}

const themes = {
  light: createTheme({
    dark: false,
    editor: {
      ...baseEditorTheme,
      background: "#FFF",
      textColor: "#000",
      cursorColor: "#000",
      gutterTextColor: "#AAA",
      activeGutterTextColor: "#000",
      activeLineBackground: "#AAA2",
      selectionBackground: "#AAA2",
      focusedSelectionBackground: "#AAA4",
      matchingBracketBackground: "#AAA6",

      // hoverGutterTextColor: "#F00",
      // hoverGutterBackground: "#F00",
    },
    syntax: [],
  }),
  dark: createTheme({
    dark: true,
    editor: {
      ...baseEditorTheme,
    },
    syntax: [],
  }),
}

export type CodeMirrorThemeName = keyof typeof themes

export const getTheme = (theme: CodeMirrorThemeName) => themes[theme]
