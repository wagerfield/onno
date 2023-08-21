export default `import { onno } from "onno"

// Define button component variants
const button = onno({
  base: "flex items-center cursor-pointer rounded",
  variants: {
    disabled: "pointer-events-none opacity-50",
    hidden: "hidden",
    intent: {
      primary: "bg-indigo-500 text-white",
      secondary: "bg-slate-100 text-slate-800",
    },
    size: {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-3 text-md",
      lg: "h-12 px-4 text-md",
    },
  },
  defaults: {
    intent: "primary",
    size: "md",
  },
})

// Generate button class list
const classes = button({
  hidden: false,
  intent: "primary",
  size: "sm"
})
`
