"use client";
import {
  usePopoverContext
} from "./chunk-SQ3I4X62.mjs";

// src/popover-content.tsx
import { useMemo, useRef } from "react";
import { forwardRef } from "@nextui-org/system";
import { DismissButton } from "@react-aria/overlays";
import { TRANSITION_VARIANTS } from "@nextui-org/framer-transitions";
import { motion } from "framer-motion";
import { useDialog } from "@react-aria/dialog";
import { mergeProps } from "@react-aria/utils";
import { RemoveScroll } from "react-remove-scroll";
import { getTransformOrigins } from "@nextui-org/aria-utils";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var PopoverContent = forwardRef((props, _) => {
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
  const dialogRef = useRef(null);
  const { dialogProps, titleProps } = useDialog({}, dialogRef);
  delete dialogProps.role;
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    !isNonModal && /* @__PURE__ */ jsx(DismissButton, { onDismiss: onClose }),
    /* @__PURE__ */ jsx(Component, { ...getDialogProps(mergeProps(dialogProps, otherProps)), ref: dialogRef, children: /* @__PURE__ */ jsx("div", { ...getContentProps({ className }), children: typeof children === "function" ? children(titleProps) : children }) }),
    /* @__PURE__ */ jsx(DismissButton, { onDismiss: onClose })
  ] });
  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }
    if (disableAnimation) {
      return /* @__PURE__ */ jsx("div", { ...getBackdropProps() });
    }
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: "enter",
        exit: "exit",
        initial: "exit",
        variants: TRANSITION_VARIANTS.fade,
        ...getBackdropProps()
      }
    );
  }, [backdrop, disableAnimation, getBackdropProps]);
  return /* @__PURE__ */ jsxs("div", { ...getPopoverProps(), children: [
    backdropContent,
    /* @__PURE__ */ jsx(RemoveScroll, { forwardProps: true, enabled: shouldBlockScroll && isOpen, removeScrollBar: false, children: disableAnimation ? content : /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: "enter",
        exit: "exit",
        initial: "initial",
        style: {
          ...getTransformOrigins(placement === "center" ? "top" : placement)
        },
        variants: TRANSITION_VARIANTS.scaleSpringOpacity,
        ...motionProps,
        children: content
      }
    ) })
  ] });
});
PopoverContent.displayName = "NextUI.PopoverContent";
var popover_content_default = PopoverContent;

export {
  popover_content_default
};
