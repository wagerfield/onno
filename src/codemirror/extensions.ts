import { history, historyKeymap, defaultKeymap } from "@codemirror/commands"
import { EditorState, type Extension } from "@codemirror/state"
import {
  closeBrackets,
  autocompletion,
  completionKeymap,
  closeBracketsKeymap,
} from "@codemirror/autocomplete"
import {
  keymap,
  lineNumbers,
  drawSelection,
  highlightActiveLine,
  highlightSpecialChars,
  highlightActiveLineGutter,
} from "@codemirror/view"
import { getTheme } from "./themes"

export const getExtensions = (extensions: Extension): Extension => [
  autocompletion(),
  closeBrackets(),
  lineNumbers(),
  history(),

  // Selection
  drawSelection(),
  EditorState.allowMultipleSelections.of(true),

  // Highlighting
  highlightSpecialChars(),
  highlightActiveLineGutter(),
  highlightActiveLine(),

  // Theme
  getTheme(false),

  // Keymap
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
    ...completionKeymap,
    ...closeBracketsKeymap,
    // ...lintKeymap
  ]),

  // External
  extensions,
]
