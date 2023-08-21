import type { Extension } from "@codemirror/state"
import type { TagStyle } from "@codemirror/language"

import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { EditorView } from "@codemirror/view"

export interface EditorTheme {
  focusedOutline?: string
  background?: string
  textColor?: string

  // Typography
  fontSize?: string
  fontFamily?: string
  lineHeight?: string | number

  // Cursor
  cursorColor?: string
  cursorWidth?: number

  // Padding
  contentPadding?: string
  gutterPadding?: string
  linePadding?: string

  // Line
  activeLineBackground?: string

  // Gutter
  gutterBorder?: string
  gutterMinWidth?: string
  gutterTextColor?: string
  gutterBackground?: string
  gutterBackdropFilter?: string
  hoverGutterTextColor?: string
  hoverGutterBackground?: string
  activeGutterTextColor?: string
  activeGutterBackground?: string

  // Selection
  selectionBackground?: string
  focusedSelectionBackground?: string

  // Brackets
  matchingBracketBackground?: string
  matchingBracketTextColor?: string
}

export interface CodeMirrorTheme {
  editor: EditorTheme
  syntax: TagStyle[]
  dark: boolean
}

export interface StyleSpec {
  [key: string]: StyleSpec | string | number | null
}

export interface EditorSpec {
  [selector: string]: StyleSpec
}

export const createEditorTheme = ({
  cursorColor = "black",
  cursorWidth = 2,
  ...theme
}: EditorTheme): EditorSpec => ({
  "&": {
    background: theme.background ?? null,
    color: theme.textColor ?? null,
  },
  "&.cm-focused": {
    outline: theme.focusedOutline ?? null,
  },
  ".cm-scroller": {
    fontSize: theme.fontSize ?? null,
    fontFamily: theme.fontFamily ?? null,
    lineHeight: theme.lineHeight ?? null,
  },
  ".cm-content": {
    caretColor: cursorColor,
    padding: theme.contentPadding ?? null,
  },

  // Gutter
  ".cm-gutters": {
    backdropFilter: theme.gutterBackdropFilter ?? null,
    background: theme.gutterBackground ?? null,
    borderRight: theme.gutterBorder ?? null,
    color: theme.gutterTextColor ?? null,
  },
  ".cm-lineNumbers .cm-gutterElement": {
    minWidth: theme.gutterMinWidth ?? null,
    padding: theme.gutterPadding ?? null,
    cursor: "pointer",
  },
  ".cm-gutterElement:hover": {
    background: theme.hoverGutterBackground ?? null,
    color: theme.hoverGutterTextColor ?? null,
  },

  // Line
  ".cm-line": {
    padding: theme.linePadding ?? null,
  },
  ".cm-activeLine": {
    background: theme.activeLineBackground ?? null,
  },
  ".cm-activeLineGutter": {
    background: theme.activeGutterBackground ?? null,
    color: theme.activeGutterTextColor ?? null,
  },

  // Cursor
  "&.cm-focused .cm-cursor": {
    borderLeft: `${cursorColor} solid ${cursorWidth}px`,
    marginLeft: `-${cursorWidth}px`,
  },

  // Selection
  ".cm-selectionMatch": {
    backgroundColor: "#f00", // TODO: Make this configurable
  },
  ".cm-selectionBackground": {
    background: theme.selectionBackground ?? null,
  },
  "&.cm-focused .cm-scroller .cm-selectionLayer .cm-selectionBackground": {
    background: theme.focusedSelectionBackground ?? null,
  },

  // Brackets
  "&.cm-focused .cm-matchingBracket": {
    background: theme.matchingBracketBackground ?? null,
    color: theme.matchingBracketTextColor ?? null,
  },
})

export const createTheme = (theme: CodeMirrorTheme): Extension => [
  EditorView.theme(createEditorTheme(theme.editor), { dark: theme.dark }),
  syntaxHighlighting(HighlightStyle.define(theme.syntax), { fallback: true }),
]
