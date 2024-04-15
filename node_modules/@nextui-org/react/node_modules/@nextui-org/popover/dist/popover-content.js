"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/popover-content.tsx
var popover_content_exports = {};
__export(popover_content_exports, {
  default: () => popover_content_default
});
module.exports = __toCommonJS(popover_content_exports);
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_overlays = require("@react-aria/overlays");
var import_framer_transitions = require("@nextui-org/framer-transitions");
var import_framer_motion = require("framer-motion");
var import_dialog = require("@react-aria/dialog");
var import_utils = require("@react-aria/utils");
var import_react_remove_scroll = require("react-remove-scroll");
var import_aria_utils = require("@nextui-org/aria-utils");

// src/popover-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [PopoverProvider, usePopoverContext] = (0, import_react_utils.createContext)({
  name: "PopoverContext",
  errorMessage: "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"
});

// src/popover-content.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PopoverContent = (0, import_system.forwardRef)((props, _) => {
  const { as, children, className, ...otherProps } = props;
  const {
    Component: OverlayComponent,
    isOpen,
    placement,
    motionProps,
    backdrop,
    disableAnimation,
    shouldBlockScroll,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose
  } = usePopoverContext();
  const Component = as || OverlayComponent || "div";
  const dialogRef = (0, import_react.useRef)(null);
  const { dialogProps, titleProps } = (0, import_dialog.useDialog)({}, dialogRef);
  delete dialogProps.role;
  const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    !isNonModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_overlays.DismissButton, { onDismiss: onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...getDialogProps((0, import_utils.mergeProps)(dialogProps, otherProps)), ref: dialogRef, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getContentProps({ className }), children: typeof children === "function" ? children(titleProps) : children }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_overlays.DismissButton, { onDismiss: onClose })
  ] });
  const backdropContent = (0, import_react.useMemo)(() => {
    if (backdrop === "transparent") {
      return null;
    }
    if (disableAnimation) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getBackdropProps() });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        animate: "enter",
        exit: "exit",
        initial: "exit",
        variants: import_framer_transitions.TRANSITION_VARIANTS.fade,
        ...getBackdropProps()
      }
    );
  }, [backdrop, disableAnimation, getBackdropProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...getPopoverProps(), children: [
    backdropContent,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_remove_scroll.RemoveScroll, { forwardProps: true, enabled: shouldBlockScroll && isOpen, removeScrollBar: false, children: disableAnimation ? content : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        animate: "enter",
        exit: "exit",
        initial: "initial",
        style: {
          ...(0, import_aria_utils.getTransformOrigins)(placement === "center" ? "top" : placement)
        },
        variants: import_framer_transitions.TRANSITION_VARIANTS.scaleSpringOpacity,
        ...motionProps,
        children: content
      }
    ) })
  ] });
});
PopoverContent.displayName = "NextUI.PopoverContent";
var popover_content_default = PopoverContent;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
