import { compose as c } from "./style"
import { values as v } from "./utils"

import { ColorProps } from "./color"
import * as C from "./color"
export const color = c<ColorProps>(v(C))

import { LayoutProps } from "./layout"
import * as L from "./layout"
export const layout = c<LayoutProps>(v(L))

import { SpaceProps } from "./space"
import * as S from "./space"
export const space = c<SpaceProps>(v(S))
