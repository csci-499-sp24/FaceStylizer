"use client";
import {
  avatar_default
} from "./chunk-XBMXQVV7.mjs";
import {
  useAvatarGroup
} from "./chunk-HHRZQPSU.mjs";
import {
  AvatarGroupProvider
} from "./chunk-PM5WBSHT.mjs";

// src/avatar-group.tsx
import { forwardRef } from "@nextui-org/system";
import { jsx, jsxs } from "react/jsx-runtime";
var AvatarGroup = forwardRef((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => /* @__PURE__ */ jsx(avatar_default, { className: "hover:-translate-x-0", name: `+${count}` }),
    getAvatarGroupProps
  } = useAvatarGroup({
    ...props,
    ref
  });
  return /* @__PURE__ */ jsx(Component, { ...getAvatarGroupProps(), children: /* @__PURE__ */ jsxs(AvatarGroupProvider, { value: context, children: [
    clones,
    remainingCount > 0 && renderCount(remainingCount)
  ] }) });
});
AvatarGroup.displayName = "NextUI.AvatarGroup";
var avatar_group_default = AvatarGroup;

export {
  avatar_group_default
};
