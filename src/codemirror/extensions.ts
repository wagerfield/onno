import { history, historyKeymap, defaultKeymap } from "@codemirror/commands"
import { indentOnInput, bracketMatching } from "@codemirror/language"
import { EditorState, type Extension } from "@codemirror/state"
import { lintKeymap } from "@codemirror/lint"
import {
  closeBrackets,
  autocompletion,
  completionKeymap,
  closeBracketsKeymap,
} from "@codemirror/autocomplete"
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
import { getTheme, type CodeMirrorThemeName } from "./themes"

export interface ExtensionOptions {
  extensions?: Extension
  theme?: CodeMirrorThemeName
}

export const getExtensions = ({
  extensions = [],
  theme = "light",
}: ExtensionOptions = {}): Extension => [
  autocompletion(),
  indentOnInput(),
  lineNumbers(),
  history(),

  // Language
  closeBrackets(),
  bracketMatching(),

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
  getTheme(theme),

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
