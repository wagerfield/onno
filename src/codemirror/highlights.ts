import { HighlightStyle } from "@codemirror/language"
import { tags } from "@lezer/highlight"

const lightTheme = HighlightStyle.define([
  // { tag: tags.meta, color: "#404740" },
  // { tag: tags.link, textDecoration: "underline" },
  // { tag: tags.heading, textDecoration: "underline", fontWeight: "bold" },
  // { tag: tags.emphasis, fontStyle: "italic" },
  // { tag: tags.strong, fontWeight: "bold" },
  // { tag: tags.strikethrough, textDecoration: "line-through" },
  // { tag: tags.keyword, color: "#00F" },
  // {
  //   tag: [
  //     tags.atom,
  //     tags.bool,
  //     tags.url,
  //     tags.contentSeparator,
  //     tags.labelName,
  //   ],
  //   color: "#219",
  // },
  // { tag: [tags.literal, tags.inserted], color: "#164" },
  // { tag: [tags.string, tags.deleted], color: "#0A4" },
  // { tag: [tags.regexp, tags.escape, tags.special(tags.string)], color: "#e40" },
  // { tag: tags.definition(tags.variableName), color: "#A0F" },
  // { tag: tags.local(tags.variableName), color: "#30a" },
  // { tag: [tags.typeName, tags.namespace], color: "#085" },
  // { tag: tags.className, color: "#167" },
  // { tag: [tags.special(tags.variableName), tags.macroName], color: "#256" },
  // { tag: tags.definition(tags.propertyName), color: "#00c" },
  // { tag: tags.comment, color: "#999" },
  // { tag: tags.invalid, color: "#f00" },

  {
    tag: tags.comment,
    color: "#9995b7",
  },
  {
    tag: tags.keyword,
    color: "#ff5792",
    fontWeight: "bold",
  },
  {
    tag: [tags.definitionKeyword, tags.modifier],
    color: "#ff5792",
  },
  {
    tag: [tags.className, tags.tagName, tags.definition(tags.typeName)],
    color: "#0094f0",
  },
  {
    tag: [tags.number, tags.bool, tags.null, tags.special(tags.brace)],
    color: "#5842ff",
  },
  {
    tag: [tags.definition(tags.propertyName), tags.function(tags.variableName)],
    color: "#0095a8",
  },
  {
    tag: tags.typeName,
    color: "#b3694d",
  },
  {
    tag: [tags.propertyName, tags.variableName],
    color: "#fa8900",
  },
  {
    tag: tags.operator,
    color: "#ff5792",
  },
  {
    tag: tags.self,
    color: "#e64100",
  },
  {
    tag: [tags.string, tags.regexp],
    color: "#00b368",
  },
  {
    tag: [tags.paren, tags.bracket],
    color: "#0431fa",
  },
  {
    tag: tags.labelName,
    color: "#00bdd6",
  },
  {
    tag: tags.attributeName,
    color: "#e64100",
  },
  {
    tag: tags.angleBracket,
    color: "#9995b7",
  },
])

const darkTheme = HighlightStyle.define([])

export function getHighlighting(dark: boolean): HighlightStyle {
  return dark ? darkTheme : lightTheme
}
