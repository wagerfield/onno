import { history, historyKeymap, defaultKeymap } from "@codemirror/commands"
import { EditorState, type Extension } from "@codemirror/state"
import { lintKeymap } from "@codemirror/lint"
import {
  closeBrackets,
  autocompletion,
  completionKeymap,
  closeBracketsKeymap,
} from "@codemirror/autocomplete"
import {
  indentOnInput,
  bracketMatching,
  syntaxHighlighting,
} from "@codemirror/language"
import {
  keymap,
  dropCursor,
  lineNumbers,
  drawSelection,
  crosshairCursor,
  highlightActiveLine,
  rectangularSelection,
  highlightSpecialChars,
  highlightActiveLineGutter,
} from "@codemirror/view"
import { getTheme } from "./themes"
import { getHighlighting } from "./highlights"

export const getExtensions = (
  extensions: Extension,
  dark = false,
): Extension => [
  autocompletion(),
  indentOnInput(),
  lineNumbers(),
  history(),

  // Language
  closeBrackets(),
  bracketMatching(),
  syntaxHighlighting(getHighlighting(dark), { fallback: true }),

  // Cursor
  dropCursor(),
  crosshairCursor(),

  // Selection
  drawSelection(),
  rectangularSelection(),
  EditorState.allowMultipleSelections.of(true),

  // Highlighting
  highlightSpecialChars(),
  highlightActiveLineGutter(),
  highlightActiveLine(),

  // Theme
  getTheme(dark),

  // Keymap
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
    ...completionKeymap,
    ...closeBracketsKeymap,
    ...lintKeymap,
  ]),

  // External
  extensions,
]
